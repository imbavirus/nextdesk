import { LoginRequest } from '@/model/login/LoginRequest';
import { User } from '@prisma/client';
import { NextResponse } from 'next/server';
import { updateSysInfo } from './sysInfoManager';
import { handleToken } from './tokenManager';
import { UserPayload } from '@/model/user/UserPayload';
import { LoginResponse } from '@/model/login/LoginResponse';
import { hash, compare } from 'bcrypt';
import { prisma } from './prismaManager';


export const unauthorizedResponse = (message ?: string) => {
    return NextResponse.json({ error: message ?? 'Unauthorized' }, { status: 401 });
};

const getPrismaUser = async (data : LoginRequest) => {
    const prismaUser = await prisma.user.findFirst({ where: { name: data.username } });
    return prismaUser;
};

const validatePrismaUser = async (data : LoginRequest, prismaUser : User | null) => {    
    if (prismaUser === null) {
        return unauthorizedResponse('Invalid Username');
    }
    if (data.id === undefined || data.uuid === undefined || data.username === undefined) {
        return unauthorizedResponse('Missing Data');
    }
    if (!(await compare(data.password, prismaUser.password))) {
        return unauthorizedResponse('Invalid Password');
    }
};

export const handleLogin = async (data : LoginRequest) => {
    const prismaUser = await getPrismaUser(data);
    const validationResponse = await validatePrismaUser(data, prismaUser);
    if (validationResponse) {
        return validationResponse; // Return the unauthorized response if validation fails
    }
    await updateSysInfo(data);
    if (prismaUser === null) {
        throw validatePrismaUser(data, prismaUser);
    }
    const token = await handleToken(data, prismaUser);
    const response : LoginResponse = {
        'access_token': token,
        'type': 'access_token',
        'tfa_type': 'none', // Adjust if you implement 2FA
        'secret': data.uuid,
        'user': prismaUser as UserPayload,
    };

    return NextResponse.json(response);
};

// Example function to hash a password before storing it
export const hashPassword = async (password : string) : Promise<string> => {
    const saltRounds = 10; // Adjust the cost factor as needed
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
};
