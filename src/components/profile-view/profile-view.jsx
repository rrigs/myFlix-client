import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./profile-view.scss";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Link } from "react-router-dom";

import axios from "axios";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      dob: "",
      favoriteMovies: [],
      movies: "",
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }

  getUser(token) {
    //console.log(localStorage.getItem("user"));
    let url =
      "https://my-flix-db-app.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log(response);
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          dob: this.formatDate(response.data.Birthday),
          favoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://my-flix-db-app.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      });
  }

  handleDelete() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .delete(`https://my-flix-db-app.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(user + " has been deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.props;
    // this.getUser(localStorage.getItem("token"));
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });
    console.log(favoriteMovieList);

    if (!movies) alert("Please sign in");
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Form style={{ width: "24rem", float: "left" }}>
                <h1 style={{ textAlign: "center" }}>Profile Details</h1>
                <Card className="text-center" border="dark">
                  <Card.Body>
                <Form.Group controlId="formBasicUsername">
                  <h4>Username: </h4>
                  <Form.Label>{this.state.username}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <h4>Email:</h4>
                  <Form.Label>{this.state.email}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicDate">
                  <h4>Date of Birth:</h4>
                  <Form.Label>{this.state.dob}</Form.Label>
                </Form.Group>
                <Link to={`/update/${this.state.username}`}>
                  <Button variant="outline-dark" type="link" size="sm" block>
                    Edit Profile
                  </Button>
                </Link>
                <Link to={`/`}>
                  <Button variant="outline-dark" type="submit" size="sm" block>
                    Back to Main
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  block
                  onClick={() => this.handleDelete()}
                >
                      Delete Account
                </Button>
                    </Card.Body>
                  </Card>
              </Form>
            </Col>
            <Col>
                <h1 style={{ textAlign: "center" }}>Favorite Movies</h1>
                {favoriteMovieList.map((movie) => {
                  return (
                    <div key={movie._id}>
                      <Card className="text-center" border="dark">
                        <Card.Img variant="top" src={movie.ImagePath} />
                        <Card.Body>
                          <Card.Title>{movie.Title}</Card.Title>
                          <Link to={`/movies/${movie._id}`}>
                            <Button variant="dark" size="sm">
                              More Info
                            </Button>
                          </Link>
                          <Card.Body>
                          <Button
                        variant="danger" size="sm"
                        onClick={() => this.removeFavorite(movie)}
                      >
                              Remove from Favorites
                      </Button>
                            </Card.Body>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
              {/* </div> */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
};
