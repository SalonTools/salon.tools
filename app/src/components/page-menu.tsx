import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { cssClasses } from '../constants/css-classes';
import classNames from 'classnames';

import styles from './page-menu.module.css';

export function PageMenu() {
   return <section className={cssClasses.PAGE_MENU}>
      <ul>
         <li><NavLink className={activeClassName} to="/clients">Clients</NavLink></li>
         <li><NavLink className={activeClassName} to="/search">Search</NavLink></li>
      </ul>
   </section>
}

function activeClassName({isActive}: { isActive: boolean }) {
   return classNames(isActive && styles.current);
}
