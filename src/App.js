import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Index from "./components/Index";
import NoMatch from "./components/NoMatch";
import Modal from "./components/Modal";
import ModalTweet from "./components/ModalTweet";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Modal />
        <ModalTweet />
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/index" component={Index} />
          <Route exact path="/edit/:username" component={EditProfile} />
          <Route path="/:username" component={Profile} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
