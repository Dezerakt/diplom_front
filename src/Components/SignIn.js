import React, {useState} from 'react';
import Layout from "../Assets/Layout";
import {Button, Form} from "react-bootstrap";

function SignIn(props) {
    const [values, setValues] = useState({
        email: '',

        password: ''
    });

    function onEnter(x){
        x.preventDefault();
        console.log(values)
    }

    return (
        <Layout>
            <Form>
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