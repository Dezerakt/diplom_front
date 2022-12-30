import React from 'react';
import Header from "./Header";

function Layout(props) {
    return (
        <div>
            <Header/>
            <div style={{
                margin: "5px 3% 0 3%",
            }}>
                {props.children}
            </div>
        </div>
    );
}

export default Layout;