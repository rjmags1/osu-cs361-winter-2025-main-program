import ConnectionPool from "@/db";

import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
    message: string;
};

// Example: pages/api/my-route.js
export async function GET(req: NextRequest) {
    // Your route logic here
    const posts = await ConnectionPool.query("SELECT * from public.posts");
    return NextResponse.json(posts.rows, { status: 200 });
}

/*
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    res.status(200).json({ message: "Hello from Next.js!" });
}
*/
