//app/api/sysinfo/route.ts
import { SystemInformation } from '@/types/system/SystemInformation';
import { NextResponse } from 'next/server';
import { getUserIdFromUsername } from '@/services/userService';
import { prisma } from '@/services/prismaService';


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
