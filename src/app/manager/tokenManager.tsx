import { LoginRequest } from '@/model/login/LoginRequest';
import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const disableTokens = async (userId : number, systemId : string) => {    
    await prisma.userToken.updateMany({ where: { userId: userId, systemId: systemId }, data: { isActive: false }});
};

const generateToken = (request : LoginRequest) => {
    const secretKey = request.uuid;
    if (secretKey === undefined) {
        return undefined;
    }
    const token = jwt.sign(
        { 
            name: request.username,
            id: request.id,
        },
        secretKey,
        { expiresIn: '1y' } // Token expires in 1 year
    );
    return token;
};

const validateToken = (token ?: string) => {
    if (token === undefined) {
        throw NextResponse.json({ error: 'Could not generate token' }, { status: 401 });
    }
    return token;
};

export const handleToken = async (data : LoginRequest, prismaUser : User) => {
    await disableTokens(prismaUser?.id ?? 0, data.id);
    const token = generateToken(data);
    const validatedToken = validateToken(token);
    await prisma.userToken.create({ data: { userId: prismaUser.id, systemId: data.id, token: validatedToken, isActive: true }});
    return validatedToken;
};
