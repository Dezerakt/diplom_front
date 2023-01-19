import React, {useEffect, useState} from 'react';
import Layout from "../Assets/Layout";
import {Button, Col, Container, FloatingLabel, Form, Image, InputGroup, Row, Table} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";

function Profile(props) {
    const back_url = process.env.REACT_APP_BACK_URL;

    const [values, setValues] = useState({
        id: '',
        email: '',
        username: '',
        password: '',
    });

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.post(back_url + '/api/auth/get-info',{
            token: localStorage.getItem("token")
        }).then(response => {
            setValues({
                id: response.data.ID,
                email: response.data.login,
                username: response.data.username,
                password: response.data.password
            })
        }).catch(error => {
            console.log(error)
        })

        axios.post(back_url + '/api/cart/user',{
            user_id: parseInt(values.id)
        }).then(response => {
            console.log(response.data)
            setOrders(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, []);



    function onEnter(x){
        x.preventDefault()
        console.log(values)
        axios.post(back_url + '/api/auth/change',{
            username: values.username,
            password: values.password,
            login: values.email
        }).then(response => {
            setValues({
                email: response.data.login,
                username: response.data.username,
                password: response.data.password
            })
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Layout>
            <Container fluid={true}>
                <Row lg={20}>
                    <Col lg={5}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    value={values.email}
                                    onChange={x => setValues({...values, email: x.target.value})}
                                    type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    value={values.username}
                                    onChange={x => setValues({...values, username: x.target.value})}
                                    type="text" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    value={values.password}
                                    onChange={x => setValues({...values, password: x.target.value})}
                                    type="text" placeholder="Password" />
                            </Form.Group>
                            <Button onClick={onEnter} variant="primary" type="submit">
                                Change
                            </Button>
                        </Form>
                    </Col>
                    <Col lg={15}>
                        <Table hover={true} horizontal={true}>
                            <thead>
                                <tr>
                                    <td>
                                        Album
                                    </td>
                                    <td>
                                        Status
                                    </td>
                                    <td>
                                        Order created at
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                orders ? orders.map(order => {
                                    return (

                                        <tr key={order.Cart.ID + '-album'}>
                                            <td>
                                               {/* <Image style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    marginRight: '10px'
                                                }} src={order.Album.image_url}/>*/}
                                                <Link to={'/album/' + order.Album.ID}>
                                                    <Image style={{
                                                        width: '80px',
                                                        height: '80px',
                                                        marginRight: '10px'
                                                    }} src={order.Album.image_url}/>
                                                    {order.Album.name}
                                                </Link>
                                            </td>
                                            <td>
                                                In Process
                                            </td>
                                            <td>
                                                {order.Cart.release_date}
                                            </td>
                                        </tr>

                                    )
                                }) : null
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Profile;