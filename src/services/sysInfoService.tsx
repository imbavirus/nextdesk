import { Heartbeat } from '@/types/heartbeat/Heartbeat';
import { LoginRequest } from '@/types/login/LoginRequest';
import { prisma } from './prismaService';
import { getUserIdFromUsername } from './userService';
import { Peer } from '@/types/peer/Peer';
import { uniq } from 'lodash-es';
import { User } from '@prisma/client';

export const updateSysInfo = async (data : LoginRequest) => {
    const userId = await getUserIdFromUsername(data.username);
    await prisma.system.upsert({ 
        where: { id : data.id},
        create: { 
            id : data.id,
            userId,
            uuid : data.uuid,
        },
        update : {
            id: data.id,
            lastSeen: new Date()
        },
    });
};

export const handleHeartbeat = async (data : Heartbeat) => {
    await prisma.system.upsert({ 
        where: { id : data.id},
        create: { 
            id : data.id,
            uuid : data.uuid,
        },
        update : {
            id: data.id,
            lastSeen: new Date()
        },
    });
};

export const updateSystemPlatform = async (peers : Array<Peer>, users : Array<User>) => {
    const systemIds =  uniq(peers.map(x => x.id));
    const upsertOperations = systemIds.map(systemId => {
        const peer = peers.find(x => x.id === systemId);
        if (peer === undefined) {
            return;
        }
        const user = users.find(x => x.name === peer.username);
        return prisma.system.upsert({ 
            where: { id : systemId},
            create: { 
                id : systemId,
                userId : user?.id,
                platform : peer.platform,
            },
            update : { 
                id: systemId,
                userId : user?.id,
                platform : peer.platform,
                lastSeen: new Date()
            },
        });
    });

    // Execute all upsert operations concurrently
    await Promise.all(upsertOperations);
};
