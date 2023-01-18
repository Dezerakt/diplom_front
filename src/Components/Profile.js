import React, {useEffect, useState} from 'react';
import Layout from "../Assets/Layout";
import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import axios from "axios";

function Profile(props) {
    const back_url = process.env.REACT_APP_BACK_URL;

    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
    });

    useEffect(() => {
        axios.post(back_url + '/api/auth/get-info', {},{
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(response => {
            setValues({
                email: response.data.login,
                username: response.data.username,
                password: response.data.password
            })
        }).catch(error => {
            console.log(error)
        })
    }, []);



    function onEnter(x){
        x.preventDefault()
        console.log(values)


    }

    return (
        <Layout>
            <Container fluid={true}>
                <Row>
                    <Col>
                        <h4>Email: {values.email}</h4>
                        <h4>Username: {values.username}</h4>
                        <h4>Password: {values.password}</h4>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    defaultValue={values.email}
                                    onChange={x => setValues({...values, email: x.target.value})}
                                    type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    onChange={x => setValues({...values, username: x.target.value})}
                                    type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    onChange={x => setValues({...values, password: x.target.value})}
                                    type="password" placeholder="Password" />
                            </Form.Group>
                            <Button onClick={onEnter} variant="primary" type="submit">
                                Change
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Profile;