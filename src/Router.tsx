// src/Router.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// // Layout Components
// import Header from './components/common/Header';
// import Footer from './components/common/Footer';
import App from './App'; // Asosiy layout

// Page Components
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Issues from './pages/Issues/Issues';
import EditorialBoard from './pages/EditorialBoard/EditorialBoard';
import ForAuthors from './pages/ForAuthors/ForAuthors';
import Contacts from './pages/Contacts/Contacts';
import Page404 from './pages/Page404/Page404';
import IssueDetail from "./pages/Issues/IssueDetail.tsx";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            {/* App komponenti Header va Footer'ni o'z ichiga oladi */}
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="issues" element={<Issues />} />
                    <Route path="issues/:issueId" element={<IssueDetail />} />
                    <Route path="editorial-board" element={<EditorialBoard />} />
                    <Route path="for-authors" element={<ForAuthors />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;