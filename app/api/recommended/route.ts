/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";

// Example: pages/api/my-route.js
export async function GET(req: NextRequest) {
    // Your route logic here
    const lat = req.nextUrl.searchParams.get("lat");
    const long = req.nextUrl.searchParams.get("long");
    const url = `http:/127.0.0.1:4003/posts?lat=${lat}&long=${long}`;
    const posts = await fetch(url);
    const postsJson = await posts.json();
    return NextResponse.json(
        { success: true, data: postsJson },
        { status: 200 }
    );
}
