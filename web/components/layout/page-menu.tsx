import { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import { Nav } from 'rsuite';

import styles from './page-menu.module.scss';

function CustomNav({ to, label }: { label: string, to: string }) {
   const router = useRouter();

   const match = router.asPath.startsWith(to);
   const href = to;
   const onClick: MouseEventHandler<HTMLElement> = (e) => {
      e.preventDefault();
      router.push(to);
   };

   return <Nav.Item active={!!match} href={href} onClick={onClick}>{label}</Nav.Item>
}

export default function PageMenu() {

   return <Nav appearance={'subtle'}  reversed className={styles.pageMenu}>
      <CustomNav to={'/clients'} label={'Clients'}/>
      <CustomNav to={'/search'} label={'Search'}/>
   </Nav>
}
