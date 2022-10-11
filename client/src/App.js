import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import Ladding from'./Components/Ladding/Ladding.jsx'
import Header from'./Components/Header/Header.jsx'
import Home from './Components/Home/Home.jsx'
import Detail from './Components/Detail/Detail.jsx'
import CreateGame from './Components/CreateGame/CreateGame.jsx'

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path='/' component={Ladding}></Route>
      <Route path='/home' component={Home}></Route>
      <Route path='/detail/:id' component={Detail}></Route>
      <Route path='/create' component={CreateGame}></Route>
      </Switch>
    </div>
  );
}

export default App;
