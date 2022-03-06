import React from 'react';
import { useHref, useLinkClickHandler, useMatch, useResolvedPath } from 'react-router-dom';
import { Nav } from 'rsuite';

import styles from './page-menu.module.scss';

function CustomNav({ to, label }: { label: string, to: string }) {
   const href = useHref(to);
   let resolved = useResolvedPath(to);
   let match = useMatch({ path: resolved.pathname, end: true });

   const onClick = useLinkClickHandler(href);

   return <Nav.Item active={!!match} href={href} onClick={onClick}>{label}</Nav.Item>
}

export function PageMenu() {

   return <Nav appearance={'subtle'}  reversed className={styles.pageMenu}>
      <CustomNav to={'/clients'} label={'Clients'}/>
      <CustomNav to={'/search'} label={'Search'}/>
   </Nav>
}
