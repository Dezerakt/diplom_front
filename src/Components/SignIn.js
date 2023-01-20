import React, {useState} from 'react';
import Layout from "../Assets/Layout";
import {Alert, Button, Form} from "react-bootstrap";
import axios from "axios";

function SignIn(props) {
    const back_url = process.env.REACT_APP_BACK_URL

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    function onEnter(x){
        x.preventDefault();
        console.log(values)
        axios.post(back_url + '/api/auth/sign-in', values)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                window.location.replace('/')
            })
            .catch(error => {
                setMessage(error.response.data)
                console.log(error.response.data)
            })
    }

    return (
        <Layout>
            <Form>
                {
                    message ?
                        <Alert key={'danger'} variant={"danger"}>
                            {message}
                        </Alert> : null
                }
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={x => setValues({...values, email: x.target.value})}
                        type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={x => setValues({...values, password: x.target.value})}
                        type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button onClick={onEnter} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Layout>
    );
}

export default SignIn;