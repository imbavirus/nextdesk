import { LoginRequest } from '@/model/login/LoginRequest';
import { handleLogin } from '@/app/manager/loginManager';
import { NextResponse } from 'next/server';

export async function POST(req : Request) {
    const data : LoginRequest = await req.json();
    try {
        const response = await handleLogin(data);

        // Check if the response is an instance of NextResponse
        if (response instanceof NextResponse) {
            return response;
        }

        // Handle successful login response
        return NextResponse.json(response);
    } catch (error) {
        console.log('error', error);
        if (error instanceof NextResponse) {
            return error;
        }
        // Handle unexpected errors
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
