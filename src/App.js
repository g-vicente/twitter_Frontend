import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Index from "./components/Index";
import NoMatch from "./components/NoMatch";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App bg-dark bg-gradient">
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/index" component={Index} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/:username" component={Profile} />
          <Route path="/edit/:username" component={EditProfile} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
