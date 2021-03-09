import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Router} from 'react-router-dom';

import firebase from "./utils/firebase";
import Home from "./components/home";
import Seating from "./components/seating";
import Calendar from "./components/calendar";
import Nav from "./components/nav";
import Login from "./components/login";
import Footer from "./components/footer";
import Announcements from './components/announcements';

class App extends React.Component{
  state={
    admin: true
  }

  render(){
    return(
      <BrowserRouter>
      <Nav />
      <Route path="/" exact component={Home} />
      <Route path="/seating" exact component={()=><Seating admin={this.state.admin}/>} />
      <Route path="/calendar" exact component={Calendar} />
      <Route path="/login" exact component={Login} />
      <Route path="/announcements" exact component={Announcements} />
    
       <Footer />
    </BrowserRouter>
    )
  }
}

 
ReactDOM.render(<App />, document.getElementById('root'));


