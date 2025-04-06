import { prisma } from '@/app/manager/prismaManager';
import { getUserIdFromGuid } from '@/app/manager/userManager';
import { AddressBookTag } from '@/model/addressBook/AddressBookTag';
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
