import React from 'react';
import { Link } from 'react-router-dom';

import styles from './page-header.module.scss';

export function PageHeader() {
   return   <header className={styles.pageHeader}>
      <h1>
         <Link to={'/'}>Site Team</Link>
      </h1>
   </header>
}
