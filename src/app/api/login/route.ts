//app/api/login/route.ts
import { LoginRequest } from '@/types/login/LoginRequest';
import { handleLogin } from '@/services/loginService';
import { NextResponse } from 'next/server';

/**
 * @openapi
 * Authenticate a user
 * @desc: Handle user login with optional 2FA
 * @auth: none
 * @params: LoginRequest
 * @response: LoginResponse
 */
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
        if (error instanceof NextResponse) {
            return error;
        }
        // Handle unexpected errors
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
};
