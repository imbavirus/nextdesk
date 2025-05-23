//app/api/ab/peers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/services/userService';
import { Peer } from '@/types/peer/Peer';
import { prisma } from '@/services/prismaService';

/**
 * @openapi
 * Retrieve a list of active peers for a user
 * @desc: Get paginated list of active peers with optional address book filtering
 * @auth: bearer
 * @params: PeerParams
 * @response: PeerResponse
 */
export async function POST(req : NextRequest) {
    const current = req.nextUrl.searchParams.get('current');
    const pageSize = req.nextUrl.searchParams.get('pageSize');
    const ab = req.nextUrl.searchParams.get('ab');
    const skip = (Number(current) - 1) * Number(pageSize);
    const take = Number(pageSize);
    const userId = await getUserIdFromRequest(req);
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
                User: true,
                Owner: true,
                System: true,
                Tags: true,
            }
        });

        const result : Array<Peer> = peers.map(x => {
            return {
                hash: ab ?? '',
                id: x.System.id,
                username: x.User?.name ?? '',
                hostname: x.System.hostname ?? '',
                platform: x.System.platform ?? '',
                alias: x.alias ?? '',
                tags: x.Tags.map(tag => tag.tag),
            };
        });

        console.log(result);

        return NextResponse.json({ status: 'ok', data: result });
    } catch (error) {
        console.error('Error fetching peers:', error);
        return NextResponse.json({ status: 'error', message: 'Failed to fetch peers' });
    }
};
