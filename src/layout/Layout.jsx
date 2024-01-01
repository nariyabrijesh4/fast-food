import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Items from '../components/Items';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../css/main.css'
import Billing from '../components/Billing';
import HeaderState from '../context/Usercontext';

function Layout() {
    return (
        <>
            <BrowserRouter>
                <HeaderState>
                    <Navbar />
                    <div className='main-outer'>
                        <Sidebar />
                        <Routes>
                            <Route path="/:categoryDescription/:id" element={<Items />} />
                        </Routes>
                        <Billing />
                    </div>
                </HeaderState>
            </BrowserRouter>
        </>
    )
}

export default Layout;