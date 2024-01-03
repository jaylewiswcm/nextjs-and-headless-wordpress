import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '@/src/components/container'
import MoreStories from '@/src/components/more-stories'
import HeroPost from '@/src/components/hero-post'
import Intro from '@/src/components/intro'
import Layout from '@/src/components/layout'
import { getAllPostsForHome } from '@/src/lib/api'
import { CMS_NAME } from '@/src/lib/constants'
import { headers } from 'next/headers';

export async function getPost(){ 
  
    const response = await fetch('http://localhost:3000/api/posts/this-is-my-first-blog-post'); 
    const posts = await response.json();

    console.log(posts.allPosts)

    return posts.allPosts;
  }

export default async function Post() {
    
    const allPosts = await getPost();
    const post = allPosts.post;
    const morePosts = allPosts.posts;

  return (
    <>
    <Layout preview={false}>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <Intro />
        {post && (
          <HeroPost
            title={post.title}
            coverImage={post.featuredImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
//   const allPosts = await getAllPostsForHome(preview)

//   return {
//     props: { allPosts, preview },
//     revalidate: 10,
//   }
// }


export async function generateStaticParams({ preview = false }) {
    const posts = await fetch('https://.../posts').then((res) => res.json())

    const allPosts = await getAllPostsForHome(preview)
    
  return {
    props: { allPosts, preview },
    revalidate: 10,
  }
  }