import { handleHeartbeat } from '@/services/sysInfoService';
import { Heartbeat } from '@/types/heartbeat/Heartbeat';
import { NextResponse } from 'next/server';

export async function POST(req : Request) {
   const data : Heartbeat = await req.json();
   await handleHeartbeat(data);
   return NextResponse.json({ status: 'ok'});
}
