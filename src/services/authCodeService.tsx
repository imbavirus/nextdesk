import { prisma } from './prismaService';

export const updateAuthCodeToken = async (id : string, systemId : string, accessToken : string, userId : number) => {

    if (!id || !systemId)
        return;

    return prisma.authCode.update({
        where: { id, systemId },
        data: { accessToken, userId, isActive: true },
    });
};
