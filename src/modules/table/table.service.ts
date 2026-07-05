import { prisma } from "../../config/prisma";
import QRCode  from "qrcode";

export const createTableService = async (name : string) => {
    const existTable = await prisma.table.findUnique({where : {name}})
    if(existTable) {
        throw new Error('Table Sudah Ada')
    }

    const table = await prisma.table.create({data : {name}})

    const menuURL = `${process.env.CLIENT_URL}/menu?table=${table.id}`
    const qrCode = await QRCode.toDataURL(menuURL)

    return {...table, qrCode}

}


export const getAllTableService = async (search? : string) => {
    const tables = await prisma.table.findMany({
        where : {
            ...(search && {
                name : {
                    contains : search,
                    mode : 'insensitive'
                }
            })
        },
        orderBy : {
            name : 'asc'
        }
    })

    return tables
}

export const getTableByIdService = async (id : string) => {
    const table = await prisma.table.findUnique({where : {id}})
    if(!table) {
        throw new Error("Meja Tidak Ditemukan")
    }

    const menuURL = `${process.env.CLIENT_URL}/menu?table=${table.id}`
    const qrCode = await QRCode.toDataURL(menuURL)

    return {...table, qrCode}

}

export const updateTableService = async (name : string, id : string) => {
    const table = await prisma.table.findUnique({where : {id}})
    if(!table) {
        throw new Error("Meja Tidak Di Temukan")
    }

    const sameTable = await prisma.table.findUnique({where : {name}})
    if(sameTable && sameTable.id !== id) {
        throw new Error("Nama Meja Sudah Dipakai")
    }

    const updatedTable = await prisma.table.update({
        where : {id},
        data : {
            name
        }
    })

    return updatedTable
}


export const deleteTableService = async (id : string) => {
     const table = await prisma.table.findUnique({where : {id}})
    if(!table) {
        throw new Error("Meja Tidak Di Temukan")
    }

    await prisma.table.delete({
        where : {id}
    })

    return
}

