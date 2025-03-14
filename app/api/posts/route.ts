/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";

// Example: pages/api/my-route.js
export async function GET(req: NextRequest) {
    // Your route logic here
    const url = "http:/127.0.0.1:4001/posts";
    const posts = await fetch(url);
    const postsJson = await posts.json();
    return NextResponse.json(
        { success: true, data: postsJson },
        { status: 200 }
    );
}

export async function POST(req: NextRequest) {
    const post = await req.json();
    const url = "http://127.0.0.1:4001/create";
    const posted = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
    return NextResponse.json({ success: true, data: posted }, { status: 200 });
}
