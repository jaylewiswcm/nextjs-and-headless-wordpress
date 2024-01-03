import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '@/src/components/container'
import MoreStories from '@/src/components/more-stories'
import HeroPost from '@/src/components/hero-post'
import Intro from '@/src/components/intro'
import Layout from '@/src/components/layout'
import { getAllPostsForHome } from '@/src/lib/api'
import { CMS_NAME } from '@/src/lib/constants'

export async function getPosts(){ 

    const response = await fetch('http://localhost:3000/api/posts'); 
    const posts = await response.json();

    return posts.allPosts.edges; 
  }

export default async function Blog() {
    
    const allPosts = await getPosts();
    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)

  return (
    <>
    <Layout preview={false}>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featuredImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
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


// export async function generateStaticParams({ preview = false }) {
//     const posts = await fetch('https://.../posts').then((res) => res.json())

//     const allPosts = await getAllPostsForHome(preview)
    
//   return {
//     props: { allPosts, preview },
//     revalidate: 10,
//   }
//   }