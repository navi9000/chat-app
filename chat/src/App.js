import './App.css';

import MainWrapper from './components/MainWrapper'
import DialogWrapper from './components/DialogWrapper'
import UserProfile from './components/UserProfile'
import Home from './components/Home'
import Search from './components/Search';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/dialogs/:dialogId'>
          <MainWrapper content={<DialogWrapper />} />
        </Route>
        <Route path='/search'>
          <MainWrapper content={<Search />} />
        </Route>
        <Route path="/users">
          <MainWrapper content={<UserProfile />} />
        </Route>
        <Route path="/">
          <MainWrapper content={<Home />} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
