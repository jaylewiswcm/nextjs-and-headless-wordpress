import { getPostAndMorePosts } from '@/src/lib/api'

  export async function GET(req: Request,  { params }: { params: { slug: string } }) {

    console.log(params)

    // GET SINGULAR POST BASED ON PARAMS
    const postAndMorePosts = await getPostAndMorePosts(params.slug, false, false);

    return Response.json({ postAndMorePosts })
  }