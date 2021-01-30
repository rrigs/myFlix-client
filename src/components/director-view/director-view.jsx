import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import './director-view.scss';

export class DirectorView extends React.Component {
  
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director, movie } = this.props;

    if (!director) return null;

    return (
      <Container className="wrapper container-fluid">
        <Row>
          <Card className="text-center" border="dark">
              <Card.Title>{director.Director.Name}</Card.Title>
            <Card.Body>
              <Card.Subtitle>Bio: </Card.Subtitle>
              <Card.Text>{director.Director.Bio}</Card.Text>
              <Card.Subtitle>Birth: </Card.Subtitle>
              <Card.Text>{director.Director.Birth}</Card.Text>
              <Card.Subtitle>Died: </Card.Subtitle>
              <Card.Text>{director.Director.Death}</Card.Text>
            </Card.Body>
            <Card.Body>
          <Link to={`/`}>
            <Button variant="outline-dark" size="sm">Return</Button>
              </Link>
              </Card.Body>
          </Card>
          <Card.Body>
          </Card.Body>
            </Row>
            <Container>
          <h4 className="mt-4">Some {director.Director.Name} movies</h4>
          <div className="d-flex row mt-3 ml-1">
            {movies.map((movie) => {
              if (movie.Director.Name === director.Director.Name) {
                return (
                  <div key={movie._id}>
                    <Card
                      border="dark"
                      className="text-center"
                      style={{ width: '16rem' }}
                    >
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>
                        {movie.Description.substring(0, 90)}...
                      </Card.Text>
                      </Card.Body>
                      <Card.Body>
                      <Link to={`/movies/${movie._id}`}>
                        <Button
                          variant="dark"
                        >
                          More Info
                        </Button>
                      </Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </Container>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  Movie: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    },
  }),
};