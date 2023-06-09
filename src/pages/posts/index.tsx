import Head from 'next/head';
import Link from 'next/link';

import styles from './styles.module.scss';
import { getPrismicClient } from '@/services/prismic';
import { GetStaticProps } from 'next';
import Prismic, { predicate } from '@prismicio/client';
import { RichText } from 'prismic-dom'
type Post = { 
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;


}
interface PostsProps{
    posts: Post[]



}
export default function Posts( {posts}: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | ignews </title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => ( 
                        <Link key={post.slug} href={` /posts/${post.slug}`}> 
                            
                            <time> {post.updatedAt}</time>
                            <strong> { post.title }</strong>
                            <p> {post.excerpt}</p>
                        
                        </Link>

                    ) ) }
                
                </div>
            </main>
        </>

    )
}
export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    const response = await prismic.query(
      predicate.at('document.type', 'publication'),
      {
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100, // Adicione esta linha para definir o número máximo de documentos retornados
      },
    );
    console.log(response);
      const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
            }

        }
      )
    return {
      props: {
        posts,
      },
    };
  };