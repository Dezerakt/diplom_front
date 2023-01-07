import React, {useState} from 'react';
import Layout from "../Assets/Layout";
import {Button, Form} from "react-bootstrap";
import axios from "axios";

function SignUp(props) {
    const back_url = process.env.REACT_APP_BACK_URL;

    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
    });

    function onEnter(x){
        x.preventDefault()
        console.log(values)

        axios.post(back_url + '/api/auth/sign-up', {
            email: values.email,
            username: values.username,
            password: values.password
        }).then(response => {
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Layout>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={x => {
                            setValues({
                                ...values,
                                email: x.target.value
                            })
                        }}
                        type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className={'mb-3'}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        onChange={x => setValues({...values, username: x.target.value})}
                        type={'username'} placeholder={'Enter username'}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={x => {setValues({...values, password: x.target.value})}} type="password" placeholder="Password" />
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

export default SignUp;