import { NextRequest } from 'next/server';
import { unauthorizedResponse } from './loginService';
import { prisma } from './prismaService';
import { UserStatus } from '@/types/user/UserStatus';
import { randomUUID } from 'crypto';

export const getUserIdFromToken = async (token : string) => {
    const userToken = await prisma.userToken.findFirst({ where: { token, isActive: true }});
    if (userToken === null) {
        throw unauthorizedResponse('Invalid token');
    }
    return userToken.userId;
};

export const getUserIdFromRequest = async (req : Request | NextRequest) => {
    const headers = req.headers;
    const authHeader = headers.get('Authorization');

    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7); // Extract the token after "Bearer "
    }

    if (!token) throw unauthorizedResponse('Invalid token');

    const userToken = await prisma.userToken.findFirst({ where: { token, isActive: true }});

    if (!userToken) throw unauthorizedResponse('Invalid token');

    return userToken.userId;
};

export const getUserIdFromUsername = async (username ?: string) => {
    if (!username) {
        return undefined;
    }
    const user = await prisma.user.findFirst({ where: { name: username }});
    return user?.id;
};

export const getUserGuidFromId = async (id ?: number) => {
    if (!id) {
        return undefined;
    }
    const user = await prisma.user.findFirst({ where: { id }});
    return user?.guid;
};

export const getUserIdFromGuid = async (guid ?: string) => {
    if (!guid) {
        return undefined;
    }
    const user = await prisma.user.findFirst({ where: { guid }});
    return user?.id;
};

export const getUserIdsFromUsernames = async (usernames : Array<string>) => {
    const users = await prisma.user.findMany({ where: { name: { in: usernames } }});
    return users;
};

export const createOidcUser = async (email : string, provider : string) => {
    if (email && provider) {
        return (await prisma.user.findUnique({ where: { email_provider: { email, provider } } })) ?? 
        await prisma.user.create({
            data: {
                email,
                name: email,
                password: '',
                status: UserStatus.normal,
                isAdmin: false,
                guid: randomUUID(),
                provider,
            },
        });
    }
    return;
};
