import styles from './home.module.scss';
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { SubscribeButton } from '@/components/SubscribeButton';
import { GetStaticProps } from 'next';
import { stripe } from '@/services/stripe';




const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
    
  }
}

export default function Home({product}: HomeProps) {
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
        <span>for {product.amount} per month</span>
      </p>
      <SubscribeButton priceId={product.priceId}/>

        </section>

        <img src='/images/avatar.svg' alt='Girl Coding'/> 

      </main>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Mq8fdF1546knLTb4ZS4gqVd',
  );  

 const product = {
  priceId: price.id,
  amount: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price.unit_amount / 100),
  }

 return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
 }

}

