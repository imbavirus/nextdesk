//app/api/ab/tag/add/[...tagId]/route.ts
import { prisma } from '@/services/prismaService';
import { getUserIdFromGuid } from '@/services/userService';
import { AddressBookTag } from '@/types/addressBook/AddressBookTag';
import { NextResponse } from 'next/server';

export async function POST(
    req : Request,
    { params } : { params : Promise<{ tagId : Array<string> }> }
  ) {
    const data : AddressBookTag = await req.json();
    const tagId = (await params).tagId[0];
    const userId = await getUserIdFromGuid(tagId);
    if (!userId) {
        return NextResponse.error();
    }
    await prisma.tag.upsert({
        where: { tag_userId : { userId, tag: data.name }},
        create: { userId, tag: data.name, color: data.color, isActive: true },
        update: { color: data.color, isActive: true },
    });
    return new NextResponse(null, { status: 200 });
}
