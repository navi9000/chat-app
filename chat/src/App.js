import './App.css';

import MainWrapper from './components/MainWrapper'
import AuthWrapper from './components/AuthWraper';
import DialogWrapper from './components/DialogWrapper'
import UserProfile from './components/UserProfile'
import Home from './components/Home'
import Search from './components/Search';
import Login from './components/Login'
import Signup from './components/Signup'

import CustomRoute from './utils/CustomRoute';

import firebase from "firebase/compat/app";
import { firebaseConfig } from './firebase';

import { useEffect } from 'react';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig)
  }, [])

  return (
    <Router>
      <Switch>
        <CustomRoute path='/dialogs/:dialogId' secured>
          <MainWrapper content={<DialogWrapper />} />
        </CustomRoute>
        <CustomRoute path='/search' secured>
          <MainWrapper content={<Search />} />
        </CustomRoute>
        <CustomRoute path="/users" secured>
          <MainWrapper content={<UserProfile />} />
        </CustomRoute>
        <Route path="/login">
          <AuthWrapper content={<Login />} />
        </Route>
        <Route path="/signup">
          <AuthWrapper content={<Signup />} />
        </Route>
        <CustomRoute path="/" secured>
          <MainWrapper content={<Home />} />
        </CustomRoute>
      </Switch>
    </Router>
  );
}

export default App;
