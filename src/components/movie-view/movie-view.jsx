import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
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
      <Card className="text-center">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
          <Card.Text>Director: {movie.Director.Name}</Card.Text>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>

          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          <div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => this.addFavorite(movie)}
            >
              Add to Favorites
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
    //   <div className="movie-view">
    //     <img className="movie-poster" src={movie.ImagePath} />
    //     <div className="movie-title">
    //       <span className="label">Title: </span>
    //       <span className="value">{movie.Title}</span>
    //     </div>
    //     <div className="movie-description">
    //       <span className="label">Description: </span>
    //       <span className="value">{movie.Description}</span>
    //     </div>

    //     <div className="movie-genre">
    //       <span className="label">Genre: </span>
    //       <span className="value">{movie.Genre.Name}</span>
    //     </div>
    //     <div className="movie-director">
    //       <span className="label">Director: </span>
    //       <span className="value">{movie.Director.Name}</span>
    //     </div>
    //     <button onClick={this.refreshPage}>Go Back</button>
    //   </div>
    // );
  }
}
