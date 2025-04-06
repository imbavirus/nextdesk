import { AddressBookPost } from '@/model/addressBook/AddressBookPost';
import { getUserIdFromToken, getUserIdsFromUsernames } from './userManager';
import { updateTags } from './tagManager';
import { prisma } from './prismaManager';
import { updatePeerTags } from './peerTagManager';
import { updateSystemPlatform } from './sysInfoManager';

export const updateAddressBook = async (data : AddressBookPost, token : string) => {
    const ownerId = await getUserIdFromToken(token);
    const tags = await updateTags(data.tagColors, ownerId);

    const usernames = data.peers.map(x => x.username);

    const users = await getUserIdsFromUsernames(usernames);

    await updateSystemPlatform(data.peers, users);

    // Prepare upsert operations for all peers
    const upsertOperations = data.peers.map((peer) => {
        const { username, alias, hash, id } = peer;
        const user = users.find(x => x.name === username);
        return prisma.peer.upsert({
            where: { systemId_ownerId: { ownerId, systemId: peer.id } },
            update: {
                userId: user?.id,
                isActive: true,
                alias,
                hash,
            },
            create: { 
                ownerId,
                userId: user?.id,
                isActive: true,
                alias,
                hash,
                systemId: id,
            }
        });
    });
        
    // Execute all upsert operations concurrently
    const peers = await Promise.all(upsertOperations);

    await updatePeerTags(peers, tags, data, ownerId);    
};
