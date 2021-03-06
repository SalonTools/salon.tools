import Link from 'next/link';

import styles from './page-header.module.scss';

export function PageHeader() {
   return <header className={styles.pageHeader}>
      <h1>
         <Link href={'/'}>
            <a>Salon Tools</a>
         </Link>
      </h1>
   </header>
}
