import React from "react";
import ReactDOM from "react-dom";
import MainView from "./components/main-view/main-view";
import moviesApp from "./reducers/reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Container } from "react-bootstrap";
import { devToolsEnhancer } from 'redux-devtools-extension';

//Import statement to indicate that you need to bundle './index.scss'
import "./index.scss";

const store = createStore(moviesApp, devToolsEnhancer());

class myFlixApplication extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <MainView />
        </Provider>
    );
  }
}

//Finds the root of app
const container = document.getElementsByClassName("app-container")[0];

//Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);
