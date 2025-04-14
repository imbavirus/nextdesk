//app/api/ab/tags/[...tagId]/route.ts
import { prisma } from '@/services/prismaService';
import { getUserIdFromGuid } from '@/services/userService';
import { AddressBookTag } from '@/types/addressBook/AddressBookTag';
import { NextResponse } from 'next/server';

export async function POST(req : Request,
    { params } : { params : Promise<{ tagId : Array<string> }> }
  ) {
    const tagId = (await params).tagId[0];
    const userId = await getUserIdFromGuid(tagId);
    const tags = await prisma.tag.findMany({ where: { userId, isActive: true }});
    const result : Array<AddressBookTag> = tags.map(x => {
        return {
            name: x.tag,
            color: Number(x.color),
        };
    });
    return NextResponse.json(result);
}
