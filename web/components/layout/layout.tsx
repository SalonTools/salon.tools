import { ReactNode } from 'react';
import Head from 'next/head';

import { PageHeader } from './page-header';
import PageMenu from './page-menu';

import styles from './layout.module.scss';

interface LayoutProps {
   children: ReactNode;
}

export function Layout({children}: LayoutProps) {
   return <>
      <Head>
         <title>Home</title>
      </Head>
      <main className={styles.main}>
         <PageHeader/>
         <PageMenu/>
         <section className={styles.section}>
            {children}
         </section>
      </main>
   </>
}
