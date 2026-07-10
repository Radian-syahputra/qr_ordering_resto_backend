import { prisma } from "../../config/prisma";
import ExcelJS from "exceljs";

const getDateRange = (period?: string) => {
  const now = new Date();

  switch (period) {
    case "week": {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - 7);
      return startOfWeek;
    }
    case "month": {
      return new Date(now.getFullYear(), now.getMonth(), 1);
    }
    case "today":
    default: {
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
  }
};

export const getDashboardService = async (period?: string) => {
  const startDate = getDateRange(period);
  const [
    totalOrder,
    totalPending,
    totalCooking,
    totalReady,
    totalServed,
    totalMenu,
    totalTable,
  ] = await Promise.all([
    prisma.order.count({
      where: { createdAt: { gte: startDate } },
    }),
    prisma.order.count({
      where: { createdAt: { gte: startDate }, status: "PENDING" },
    }),
    prisma.order.count({
      where: { createdAt: { gte: startDate }, status: "COOKING" },
    }),
    prisma.order.count({
      where: { createdAt: { gte: startDate }, status: "READY" },
    }),
    prisma.order.count({
      where: { createdAt: { gte: startDate }, status: "SERVED" },
    }),

    prisma.menu.count(),
    prisma.table.count(),
  ]);

  return {
    totalOrder,
    totalPending,
    totalCooking,
    totalReady,
    totalServed,
    totalMenu,
    totalTable,
  };
};

export const exportOrdersToExcelService = async (period?: string) => {
  const startDate = getDateRange(period);

  const orders = await prisma.order.findMany({
    where: { createdAt: { gte: startDate } },
    include: {
      table: true,
      orderItems: {
        include: {
          menu: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Laporan Penjualan");

  worksheet.columns = [
    { header: "No", key: "no", width: 5 },
    { header: "No Meja", key: "tableName", width: 15 },
    { header: "Menu", key: "menuName", width: 20 },
    { header: "Qty", key: "quantity", width: 8 },
    { header: "Harga Satuan", key: "price", width: 15 },
    { header: "Subtotal", key: "subtotal", width: 15 },
    { header: "Status", key: "status", width: 12 },
    { header: "Tanggal", key: "date", width: 20 },
  ];

  let rowNumber = 1;

  orders.forEach((order) => {
    order.orderItems.forEach((item) => {
      worksheet.addRow({
        no: rowNumber,
        tableName: order.table.name,
        menuName: item.menu.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
        status: order.status,
        date: order.createdAt.toLocaleDateString("id-ID"),
      });
      rowNumber++;
    });
  });

  return workbook
};
