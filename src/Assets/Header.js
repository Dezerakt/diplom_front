import React from 'react';
import {
    Container, Nav,
    Navbar, Offcanvas
} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

function Header(props) {
    const ifAuth = localStorage.getItem('token')
    const back_url = process.env.REACT_APP_BACK_URL

    function logout(){
        axios.post(back_url + '/api/auth/logout', {
            token: localStorage.getItem('token')
        }).then(response => {
            localStorage.clear()
            window.location.reload()
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <Navbar key={'md'} bg="light" expand={'md'} className="mb-3 bg-dark nav-custom">
                <Container fluid>
                    <Navbar.Brand>
                        <Link to={'/'}>Music Shop</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'md'}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${'md'}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${'md'}`}
                        placement="end"
                    >
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link><Link to={'/catalog'}>Catalog</Link></Nav.Link>
                                {
                                    ifAuth != null ? <>
                                            <Nav.Link href="#action1">Profile</Nav.Link>
                                            <Nav.Link><Link to={'/cart'}>Cart</Link></Nav.Link>
                                            <Nav.Link onClick={logout}>Exit</Nav.Link>
                                        </>
                                        :
                                        <>
                                            <Nav.Link><Link to={'/auth/sign-in'}>Sign In</Link></Nav.Link>
                                            <Nav.Link><Link to={'/auth/sign-up'}>Sign Up</Link></Nav.Link>
                                        </>
                                }
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;