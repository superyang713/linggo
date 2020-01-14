import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import history from '../services/history';

import "./Login.css";

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hidden, setHidden] = useState(true);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const api_call_users = await fetch("http://127.0.0.1:5000/api/user");
        const data = await api_call_users.json();
        const users = data.users;
        const matched_user = users.filter(user => user.name.includes(username));
        if (matched_user.length) {
            if (matched_user[0].password === password) {
                history.push(`/`);
            } else {
                setHidden(false);
            }
        } else {
            fetch("http://127.0.0.1:5000/api/user", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": username,
                    "password": password
                })
            });
        }

        console.log(matched_user);
    }
    return (
        <Form onSubmit={handleSubmit}>

          <Form.Group controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter Username"
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          {!hidden && <p>Please retry your password</p>}
          <Button block disabled={!validateForm()} variant="primary" type="submit">
            Login
          </Button>
        </Form>
    );
}
