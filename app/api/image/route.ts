/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";

// Example: pages/api/my-route.js
export async function GET(req: NextRequest) {
    // Your route logic here
    const imageId = req.nextUrl.searchParams.get("id");
    if (imageId === null) {
        return NextResponse.json(
            {
                success: false,
                message: "invalid or missing id in query string",
            },
            { status: 400 }
        );
    }
    const url = `http:/127.0.0.1:4004/image/${imageId}`;
    const imageResp = await fetch(url);
    const image = await imageResp.blob();
    const imageBuffer = await image.arrayBuffer();
    return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
            "Content-Type": "image/png",
        },
    });
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) return new NextResponse("No file uploaded", { status: 400 });

    const forward = new FormData();
    forward.append("image", file);
    const url = "http://127.0.0.1:4004/upload";
    const posted = await fetch(url, {
        method: "POST",
        body: forward,
    });
    return NextResponse.json({ success: true, data: posted }, { status: 200 });
}
