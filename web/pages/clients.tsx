import Head from 'next/head';

import { ClientsHome } from '../components/clients';
import { Layout } from '../components/layout';

export default function Clients() {
   return <Layout>
      <Head>
         <title>Clients</title>
      </Head>
      <ClientsHome/>
   </Layout>
}
