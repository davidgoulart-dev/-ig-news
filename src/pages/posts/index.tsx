import Head from 'next/head';

import styles from './styles.module.scss';
import { getPrismicClient } from '@/services/prismic';
import { GetStaticProps } from 'next';
import Prismic, { predicate } from '@prismicio/client';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | ignews </title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href='#'>
                        <time>02 de Abril de 2023</time>
                        <strong>Titulo do post</strong>
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea voluptates soluta aliquam, quo laudantium repellendus nam facere impedit? Fugit perferendis quasi iure dolorum cupiditate dignissimos sequi eius omnis minus accusantium.</p>
                    </a>
                    <a href='#'>
                        <time>02 de Abril de 2023</time>
                        <strong>Titulo do post</strong>
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea voluptates soluta aliquam, quo laudantium repellendus nam facere impedit? Fugit perferendis quasi iure dolorum cupiditate dignissimos sequi eius omnis minus accusantium.</p>
                    </a>
                    <a href='#'>
                        <time>02 de Abril de 2023</time>
                        <strong>Titulo do post</strong>
                        <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea voluptates soluta aliquam, quo laudantium repellendus nam facere impedit? Fugit perferendis quasi iure dolorum cupiditate dignissimos sequi eius omnis minus accusantium.</p>
                    </a>
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
  
    return {
      props: {},
    };
  };