import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  refreshPage() {
    window.location.reload(false);
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
            <Button onClick={() => onClick(this.refreshPage)} variant="outline-danger">Go Back</Button>
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
