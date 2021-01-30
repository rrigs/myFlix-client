import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://my-flix-db-app.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;

    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        // window.open("/", "_self");
        window.open("/users/" + localStorage.getItem("user"), "_self");
        // alert("Added to favorites!");
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Container>
        <Card className="text-center" border="dark">
          <Card.Header as="h1">{movie.Title}</Card.Header>
          <Card.Body>
            <Card.Img variant="left" src={movie.ImagePath} />
          </Card.Body>
          <Card.Body>
            <Card.Subtitle>Description:</Card.Subtitle>
            <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Subtitle>Genre:</Card.Subtitle>
            <Card.Text>{movie.Genre.Name}</Card.Text>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="dark" size="sm">
                See more about this genre
              </Button>
            </Link>
          </Card.Body>
          <Card.Body>
            <Card.Subtitle>Director:</Card.Subtitle>
            <Card.Text>{movie.Director.Name}</Card.Text>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="dark" size="sm">
                See more about this director
              </Button>
            </Link>
            </Card.Body>
            <Card.Body>
              <Button
                variant="danger"
                size="sm"
                onClick={() => this.addFavorite(movie)}
              >
                Add to Favorites
              </Button>
            </Card.Body>
        </Card>
      </Container>
    );
  }
}
