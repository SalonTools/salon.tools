import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PageHeader } from '../../components/page-header';
import { PageMenu } from '../../components/page-menu';
import { ClientsPage } from '../clients';
import { HomePage } from '../home.page';

import styles from './App.module.scss';

const queryClient = new QueryClient()

function App() {
   return (
      <QueryClientProvider client={queryClient}><BrowserRouter>
         <main>
            <PageHeader/>
            <PageMenu/>
            <section className={styles.section}>
               <AppRouter/>
            </section>
         </main>
      </BrowserRouter></QueryClientProvider>
   );
}

function AppRouter() {
   return <Routes>
      <Route path={'/'} element={<HomePage/>}/>
      <Route path={'/clients'} element={<ClientsPage/>}/>
   </Routes>
}

export default App;
