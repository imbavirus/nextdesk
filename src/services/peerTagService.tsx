import { AddressBookPost } from '@/types/addressBook/AddressBookPost';
import { Peer, Tag } from '@prisma/client';
import { prisma } from './prismaService';

export const updatePeerTags = async (peers : Array<Peer>, tags : Array<Tag>, data : AddressBookPost, ownerId : number) => {

    const peerTagUpsertOperations = data.peers.flatMap((dataPeer) => {
        const peer = peers.find(x => x.ownerId === ownerId && x.systemId === dataPeer.id);
        if (peer === undefined) {
            return;
        }
        return dataPeer.tags.map((dataTag) => {
            const tag = tags.find(x => x.userId === ownerId && x.tag === dataTag);
            if (tag === undefined) {
                return;
            }
            return prisma.peerTag.upsert({
                where: { 
                    peerId_tagId_ownerId: {
                        peerId: peer.id,
                        tagId: tag.id,
                        ownerId,
                    }},
                create: {
                    peerId: peer.id,
                    tagId: tag.id,
                    ownerId,
                    isActive: true,
                },
                update: {
                    peerId: peer.id,
                    tagId: tag.id,
                    ownerId,
                    isActive: true,
                },
            });
        });
    });

    console.log('count ',peerTagUpsertOperations.length);
        
    // Execute all upsert operations concurrently
    return await Promise.all(peerTagUpsertOperations);
};
