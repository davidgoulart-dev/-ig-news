import styles from './home.module.scss';
import { Inter } from 'next/font/google'
import Head from 'next/head'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
        Get access to all the publications <br />
        <span>for $9.90 per month</span>
      </p>

        </section>

        <img src='/images/avatar.svg' alt='Girl Coding'/> 

      </main>
    </>
  )
}
