import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserIdFromGuid } from '@/app/manager/userManager';
import { Peer } from '@/model/peer/Peer';

const prisma = new PrismaClient();

export async function POST(req : NextRequest) {
    // Access query parameters using .get()
    const current = req.nextUrl.searchParams.get('current');
    const pageSize = req.nextUrl.searchParams.get('pageSize');
    const ab = req.nextUrl.searchParams.get('ab');
    const skip = (Number(current) - 1) * Number(pageSize);
    const take = Number(pageSize);
    const userId = await getUserIdFromGuid(ab as string);
    if (!userId) {
        return NextResponse.error();
    }

    try {
        const peers = await prisma.peer.findMany({
            where: {
                userId,
                isActive: true,
            },
            skip: skip,
            take: take,
            include: {
                user: true,
                owner: true,
                system: true,
                tags: true,
            }
        });

        const result : Array<Peer> = peers.map(x => {
            return {
                hash: ab ?? '',
                id: x.system?.id ?? 0,
                username: x.user?.name ?? '',
                hostname: x.system?.hostname ?? '',
                platform: x.system?.platform ?? '',
                alias: x.alias ?? '',
                tags: x.tags.map(x => x.tag),
            };
        });

        console.log(result);

        return NextResponse.json({ status: 'ok', data: result });
    } catch (error) {
        console.error('Error fetching peers:', error);
        return NextResponse.json({ status: 'error', message: 'Failed to fetch peers' });
    }
};
