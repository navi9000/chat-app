import './App.css';

import MainWrapper from './helpers/MainWrapper'
import AuthWrapper from './components/Registration/AuthWraper'
import DialogWrapper from './components/Chat/DialogWrapper'
import Home from './components/Home'
import Search from './components/Search'
import Login from './components/Registration/Login'
import Signup from './components/Registration/Signup'
import SideList from './components/Chat/SideList'
import SearchAside from './components/Search/SearchAside'

import CustomRoute from './helpers/CustomRoute'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Switch>
        <CustomRoute path='/dialogs/:dialogId' secured>
          <MainWrapper content={<DialogWrapper />} aside={<SideList />} />
        </CustomRoute>
        <CustomRoute path='/search' secured>
          <MainWrapper content={<Search />} aside={<SearchAside />} />
        </CustomRoute>
        <Route path="/login">
          <AuthWrapper content={<Login />} />
        </Route>
        <Route path="/signup">
          <AuthWrapper content={<Signup />} />
        </Route>
        <CustomRoute path="/" secured>
          <MainWrapper content={<Home />} aside={<SideList />} />
        </CustomRoute>
      </Switch>
    </Router>
  );
}

export default App;
