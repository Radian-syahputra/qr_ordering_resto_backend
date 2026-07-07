import { prisma } from "../../config/prisma";
import { OrderStatus } from "../../generated/prisma/enums";

interface OrderItemInput {
  menuId: string;
  quantity: number;
  note?: string;
}

interface CreateOrderInput {
  tableId: string;
  items: OrderItemInput[];
}

interface CalculateTotalPrice {
  price: number;
  quantity: number;
}

const calculateTotalPrice = (orderItem: CalculateTotalPrice[]) => {
  return orderItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const createOrderService = async (data: CreateOrderInput) => {
  const table = await prisma.table.findUnique({ where: { id: data.tableId } });
  if (!table) {
    throw new Error("Meja Tidak Ditemukan");
  }

  const orderItemsData = await Promise.all(
    data.items.map(async (item) => {
      const menu = await prisma.menu.findUnique({ where: { id: item.menuId } });
      if (!menu) {
        throw new Error(`Menu dengan id ${item.menuId} Tidak di temukan`);
      }

      return {
        menuId: item.menuId,
        quantity: item.quantity,
        price: menu.price,
        note: item.note,
      };
    })
  );

  const order = await prisma.order.create({
    data: {
      tableId: data.tableId,
      orderItems: {
        create: orderItemsData,
      },
    },
    include: {
      orderItems: {
        include: {
          menu: true,
        },
      },
      table: true,
    },
  });

  const totalPrice = calculateTotalPrice(order.orderItems);

  return { ...order, totalPrice };
};

export const getAllOrderService = async (search?: string) => {
  const orders = await prisma.order.findMany({
    where: {
      ...(search && {
        table: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      }),
    },
    include: {
      orderItems: {
        include: {
          menu: true,
        },
      },
      table: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const ordersWithTotal = orders.map((order) => ({
    ...order,
    totalPrice: calculateTotalPrice(order.orderItems),
  }));

  return ordersWithTotal;
};

export const getOrderByIdService = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: {
        include: {
          menu: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order Tidak Ditemukan");
  }

  const totalPrice = calculateTotalPrice(order.orderItems);

  return { ...order, totalPrice };
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  const existOrder = await prisma.order.findUnique({
    where: { id },
  });

  if (!existOrder) {
    throw new Error("Order Tidak Ditemukan");
  }

  const updatedStatus = await prisma.order.update({
    where: { id },
    data: { status },
  });

  return updatedStatus;
};
