import React from "react";
import axios from "axios";
import MoviesList from '../movies-list/movies-list';
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { ProfileView } from "../profile-view/profile-view";
import { RegistrationView } from "../registration-view/registration-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileUpdate } from "../profile-update/profile-update";
import {
  Col,
  Row,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: "",
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://my-flix-db-app.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
        //Assign the result to the state
        // this.setState({
        //   movies: response.data,
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    this.setState({
      user: null,
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    // const { movies, selectedMovie, user } = this.state;
    let { movies, visibilityFilter } = this.props;
    let { user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    return (
      <Router>
        <div>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {!user ? (
                <ul>
                  <Link to={`/`}>
                    <Button variant="outline-light">Login</Button>
                  </Link>
                  <Link to={`/register`}>
                    <Button variant="outline-light">Register</Button>
                  </Link>
                </ul>
              ) : (
                <ul>
                  <Link to={`/`}>
                    <Button variant="outline-light" onClick={() => this.logOut()}>
                      Log out
                    </Button>
                  </Link>
                  <Link to={`/users/${user}`}>
                    <Button variant="outline-light">Account</Button>
                  </Link>
                  <Link to={`/`}>
                    <Button variant="outline-light">Movies</Button>
                  </Link>
                  </ul>
                  
                )}
              </Nav>
              <ul></ul>
              <Form inline>
                <VisibilityFilterInput variant="outline-light" visibilityFilter={visibilityFilter} />
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <div className="main-view">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                return <MoviesList movies={movies}/>;
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match }) => (
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                />
              )}
            />
            <Route path="/register" render={() => <RegistrationView />} />
            <Route
              path="/directors/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <DirectorView
                    director={movies.find(
                      (m) => m.Director.Name === match.params.name
                    )}
                    movies={movies}
                  />
                );
              }}
            />
            <Route
              path="/users/:userId"
              render={() => (
                <ProfileView movies={movies} logOutFunc={() => this.logOut()} />
              )}
            />
            <Route
              path="/update/:userId"
              render={() => {
                return <ProfileUpdate />;
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return (
                  <GenreView
                    genre={movies.find(
                      (m) => m.Genre.Name === match.params.name
                    )}
                    movies={movies}
                  />
                );
              }}
            />
          </div>
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);