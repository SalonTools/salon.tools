import React from 'react';
import classNames from 'classnames';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { PageMenu } from './components/page-menu';
import { cssClasses } from './constants/css-classes';
import { HomePage } from './pages/home.page';

import './App.css';


function App() {
   return (
      <BrowserRouter>
         <main className={cssClasses.APP}>
            <header className={cssClasses.PAGE_HEADER}>
               <h1>
                  <Link to={'/'}>Site Team</Link>
               </h1>
            </header>
            <PageMenu />
            <section id={'main'} className={classNames(cssClasses.PAGE_CONTENT, cssClasses.PAGE_COMPONENT)}>
               <AppRouter/>
            </section>
         </main>
      </BrowserRouter>
   );
}

function AppRouter() {
   return <Routes>
      <Route path={'/'} element={<HomePage/>} />
      <Route path={'/clients'} element={<h1>CLIENTS</h1>} />
   </Routes>
}

export default App;
