import { handleHeartbeat } from '@/app/manager/sysInfoManager';
import { Heartbeat } from '@/model/heartbeat/Heartbeat';
import { NextResponse } from 'next/server';

export async function POST(req : Request) {
   const data : Heartbeat = await req.json();
   await handleHeartbeat(data);
   return NextResponse.json({ status: 'ok'});
}
