import React, { useState, useEffect } from "react";
// Used for Routing, {@https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom}
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Importing different routes
import ShowItem from './routes/ShowRoute';
import HomeRoute from './routes/HomeRoute'; 
import MovieItem from './routes/MovieRoute';
import MobNav from './components/sub-comps/MobNav.js';

import "./global.css";
import SearchRoute from "./routes/SearchRoute";

function App(props) {
  const [isNavActive, setIsNavActive] = useState(false)
  
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)
  
  function handleResize () {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }

  const handleHambClick = () => {
      if (isNavActive === "active") {
          setIsNavActive("closed")
      } else if (isNavActive === "closed") {
          setIsNavActive("active")
      } else {
          setIsNavActive("active")
      }
  }

  document.addEventListener("click", (event) => {
      if (isNavActive === "active") {
          let cn = event.target.className;
      
          if (
              cn === "r-selected navbar-item-link-text navbar-item-text" ||
              cn === "mob-navbar-item-link-text navbar-item-text" ||
              cn === "mob-navbar-item-list-text navbar-item-text" || 
              cn === "mob-nav h-mob-nav-active" ||
              cn === "mob-navbar" || 
              cn === "h-i-hamb-wrapper") {
                  return "";
              } else {
                  setIsNavActive("closed")
              }
      }
  })
  
  window.addEventListener("resize", handleResize)


  return (
    <Router>  

      {screenWidth <= 940 && (
        <MobNav isActive={isNavActive} />
      ) }

      <Switch>

        <Route path="/" exact>
          <HomeRoute handleHambClick={handleHambClick} screenSize={{screenWidth, screenHeight}} />
        </Route>

        <Route path="/movie/:movieId">
          <MovieItem handleHambClick={handleHambClick} screenSize={{screenWidth, screenHeight}} />
        </Route>

        <Route path="/show/:showId">
          <ShowItem handleHambClick={handleHambClick} screenSize={{screenWidth, screenHeight}} />
        </Route>

        <Route path="/search/:query" exact>
          <SearchRoute handleHambClick={handleHambClick} screenSize={{screenWidth, screenHeight}} />
        </Route>

        <Route path="/">
          <Redirect exact to="/" />
        </Route>

      </Switch>
    </Router>
)

}

export default App;