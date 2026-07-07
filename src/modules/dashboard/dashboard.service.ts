import { prisma } from "../../config/prisma";

const getDateRange =  (period?: string) => {
    const now = new Date()

    switch (period) {
        case 'week' : {
            const startOfWeek = new Date(now)
            startOfWeek.setDate(now.getDate() - 7)
            return startOfWeek
        }
        case 'month' : {
            return new Date(now.getFullYear(), now.getMonth(), 1)
        }
        case 'today' : 
        default : {
            return new Date(now.getFullYear(), now.getMonth(), now.getDate())
        }
    }
}

export const getDashboardService = async (period? : string) => {
    const startDate = getDateRange(period)
    const [totalOrder, totalPending, totalCooking, totalReady, totalServed,  totalMenu, totalTable] = await Promise.all([
        prisma.order.count({
            where : {createdAt : {gte : startDate}}
        }),
         prisma.order.count({
            where : {createdAt : {gte : startDate}, status : 'PENDING'}
        }),
         prisma.order.count({
            where : {createdAt : {gte : startDate}, status : 'COOKING'}
        }),
         prisma.order.count({
            where : {createdAt : {gte : startDate}, status : 'READY'}
        }),
         prisma.order.count({
            where : {createdAt : {gte : startDate}, status : 'SERVED'}
        }),

        prisma.menu.count(),
        prisma.table.count()
    ])

    return {totalOrder, totalPending, totalCooking, totalReady, totalServed,  totalMenu, totalTable}
}


