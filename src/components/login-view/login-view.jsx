import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://my-flix-db-app.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        // alert(e.response.data);
        // console.log(e.response.data)
        console.log("No such user.");
        alert("No such user.");
      });
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Welcome to myFlix!</h1>
      <Card border="dark">
        <Card.Body>
          <Card.Title>Please Sign In</Card.Title>
      <Form>
        <Form.Row>
          <Col>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="outline-dark" type="submit" onClick={handleSubmit}>
                  Login
            </Button>
          </Col>
        </Form.Row>
          </Form>
        </Card.Body>
      </Card>
      <Card border="dark" className="text-center">
        <Card.Body>
            <Card.Text>Not a member? Sign up for free!</Card.Text>
          <Link to={`/register`}>
                    <Button variant="dark">Register</Button>
            </Link>
            </Card.Body>
      </Card>
      
      </Container>
  );
}
