
import { useRouter } from 'next/router';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import Link from 'next/link';

export function Header() {
    const {asPath} = useRouter();

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <Link className={asPath === '/' ? styles.active : ''} href="/">
                    Home
                    </Link>
                    <Link className={asPath === '/posts' ? styles.active : '' } href="/posts" prefetch> 
                    Posts
                    </Link>
                
                </nav>
                <SignInButton/>
            </div>
        </header>
    )
}