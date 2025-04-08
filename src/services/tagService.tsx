import { prisma } from './prismaService';

export const updateTags = async (tagColors : { [key : string] : number } , userId : number) => {
    // first disable all tags and peertags from this user
    await prisma.tag.updateMany({where: { userId }, data: { isActive: false }});
    await prisma.peerTag.updateMany({where: { ownerId: userId }, data: { isActive: false }});
    
    // Prepare upsert operations for all tags
    const upsertOperations = Object.entries(tagColors).map(([key, color]) => {
            return prisma.tag.upsert({
                where: { tag_userId: {tag: key, userId} },
                update: { color: BigInt(color), isActive: true },
                create: { tag: key, color: BigInt(color), userId, isActive: true }
        });
    });

    // Execute all upsert operations concurrently
    return await Promise.all(upsertOperations);
};
