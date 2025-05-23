//app/api/heartbeat/route.ts
import { handleHeartbeat } from '@/services/sysInfoService';
import { Heartbeat } from '@/types/heartbeat/Heartbeat';
import { NextResponse } from 'next/server';

/**
 * @openapi
 * Update system heartbeat
 * @desc: Update the last seen timestamp for a system
 * @auth: bearer
 * @params: Heartbeat
 * @response: StatusResponse
 */
export async function POST(req : Request) {
   const data : Heartbeat = await req.json();
   await handleHeartbeat(data);
   return NextResponse.json({ status: 'ok'});
}
