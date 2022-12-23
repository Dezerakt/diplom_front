import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import Main from "./Components/Main";
import Singer from "./Components/Singer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Main/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/singer/:singer_id'} element={<Singer/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

