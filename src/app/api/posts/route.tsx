import { NextRequest, NextResponse } from "next/server";
import { getAllPostsForHome } from '@/src/lib/api'


  export async function GET(req: Request) {
    const allPosts = await getAllPostsForHome(false);

    return Response.json({ allPosts })
  }