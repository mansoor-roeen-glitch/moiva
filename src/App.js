import React, { useState, useEffect } from "react";
// Used for Routing, {@https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom}
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// Importing different routes
import ShowItem from './routes/ShowRoute';
import HomeRoute from './routes/HomeRoute'; 
import MovieItem from './routes/MovieRoute';
import ShowPlayer from './routes/ShowStreaming';
import MoviePlayer from './routes/MovieStreaming';

import "./global.css";

function App(props) {
  
  const [error, setError] = useState(); 
  const [result, setResult] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState();

  async function detailHandler (props) {
    console.log(props)
  }

  

  return (
    <Router>
      <Switch>

        <Route path="/" exact>
          <HomeRoute />
        </Route>

        <Route path="/movie/:movieId">
          <MovieItem />
        </Route>

        <Route path="/show/:showId">
          <ShowItem />
        </Route>

        <Route path="/movie/:movieId/player">
          <MoviePlayer />
        </Route>

        <Route path="/show/:showId/player">
          <ShowPlayer />
        </Route>

        <Route path="/">
          <Redirect exact to="/" />
        </Route>

      </Switch>
    </Router>
  )

}

export default App;