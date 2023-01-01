import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import Main from "./Components/Main";
import Singer from "./Components/Singer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Album from "./Components/Album";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Main/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/album/:album_id'} element={<Album/>}/>
            <Route path={'/singer/:singer_id'} element={<Singer/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

