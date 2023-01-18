import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Components/Main";
import Singer from "./Components/Singer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Album from "./Components/Album";
import Catalog from "./Components/Catalog";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Cart from "./Components/Cart";
import Profile from "./Components/Profile";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Main/>}/>
            <Route path={'/catalog'} element={<Catalog/>}/>
            <Route path={'/album/:album_id'} element={<Album/>}/>
            <Route path={'/singer/:singer_id'} element={<Singer/>}/>
            <Route path={'/auth/sign-up'} element={<SignUp/>}/>
            <Route path={'/auth/sign-in'} element={<SignIn/>}/>
            <Route path={'/cart'} element={<Cart/>}/>
            <Route path={'/profile'} element={<Profile/>}/>
        </Routes>
    </BrowserRouter>
);

