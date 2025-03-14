import { NextRequest, NextResponse } from "next/server";

// Example: pages/api/my-route.js
export async function GET(req: NextRequest) {
    // Your route logic here
    const lat = req.nextUrl.searchParams.get("lat");
    const long = req.nextUrl.searchParams.get("long");
    if (lat === null || long === null) {
        return NextResponse.json(
            {
                success: false,
                message: "invalid or missing lat and/or long in query string",
            },
            { status: 400 }
        );
    }
    const url = `http:/127.0.0.1:4002/weather?lat=${lat}&long=${long}`;
    const weatherInfo = await fetch(url);
    const weatherInfoJson = await weatherInfo.json();
    return NextResponse.json(
        { success: true, data: weatherInfoJson },
        { status: 200 }
    );
}
