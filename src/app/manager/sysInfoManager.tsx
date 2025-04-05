import { LoginRequest } from '@/model/login/LoginRequest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateSysInfo = async (data : LoginRequest) => {
    await prisma.systemInformation.upsert({ 
        where: { id : data.id},
        create: { 
            id : data.id,
            cpu : '',
            hostname : data.id,
            memory : '',
            os : '',
            username : data.username,
            uuid : data.uuid,
            version : '',
        },
        update : { id: data.id },
    });
};
