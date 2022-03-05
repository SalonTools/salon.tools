import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './page-menu.module.css';

export function PageMenu() {
   return <section className={styles.pageMenu}>
      <ul>
         <li><NavLink className={activeClassName} to="/clients">Clients</NavLink></li>
         <li><NavLink className={activeClassName} to="/search">Search</NavLink></li>
      </ul>
   </section>
}

function activeClassName({isActive}: { isActive: boolean }) {
   return classNames(isActive && styles.current);
}
