import { SystemInformation } from '@/model/system/SystemInformation';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserIdFromUsername } from '@/app/manager/userManager';

const prisma = new PrismaClient();


export async function POST(req : Request) {
    const data : SystemInformation = await req.json();
    const { id, cpu, os, hostname, memory, uuid, version } = data;
    const userId = await getUserIdFromUsername(data.username);
    await prisma.system.upsert({
        where: { id },
        update: {
            userId,
            cpu,
            os,
            hostname,
            memory,
            uuid,
            version,
            lastSeen: new Date(),
        },
        create: {
            userId,
            cpu,
            os,
            hostname,
            memory,
            uuid,
            version,
            lastSeen: new Date(),
            id,
        },
    });
    return NextResponse.json({ status: 'ok'});
}
