import Head from 'next/head';

import styles from './styles.module.scss';

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
