import React, {useState} from 'react';
import Layout from "./Layout";
import {
    Button,
    Container, Form, Nav,
    Navbar, NavDropdown, Offcanvas
} from "react-bootstrap";
import {Link} from "react-router-dom";

function Header(props) {
    const ifAuth = localStorage.getItem('access_token')
    const [activeItem, setActiveItem] = useState('initState');
    function handleItemClick(){

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
                                            <Nav.Link href="#action2">Cart</Nav.Link>
                                            <Nav.Link href="#action3">Exit</Nav.Link>
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