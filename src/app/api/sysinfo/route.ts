import { SystemInformation } from '@/model/system/SystemInformation';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(req : Request) {
    const data : SystemInformation = await req.json();
    await prisma.systemInformation.upsert({
        where: { id: data.id },
        update: data,
        create: data,
    });
    return NextResponse.json({ status: 'ok'});
}
