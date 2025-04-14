//app/api/ab/tag/[...tagId]/route.ts
import { prisma } from '@/services/prismaService';
import { getUserIdFromGuid } from '@/services/userService';
import { NextResponse } from 'next/server';

export async function DELETE(req : Request,
    { params } : { params : Promise<{ tagId : Array<string> }> }
  ) {
    const tagId = (await params).tagId[0];
    const data : Array<string> = await req.json();
    const userId = await getUserIdFromGuid(tagId);
    if (!userId) {
        return NextResponse.error();
    }
    // Prepare upsert operations for all tags
    const upsertOperations =data.map((tag) => {
        return prisma.tag.upsert({
            where: { tag_userId : { userId, tag }},
            create: { userId, tag, color: 0, isActive: false },
            update: { isActive: false },
        });
    });

    // Execute all upsert operations concurrently
    await Promise.all(upsertOperations);

    return new NextResponse(null, { status: 200 });
}
