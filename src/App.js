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
			<div>
				<Switch>
					<Route path="/signin" component={SignIn} />
					<Route path="/signup" component={SignUp} />
					<Route path="/index" component={Index} />
					<Route path="/edit/:username" component={EditProfile} />
					<Route path="/user/:username" component={Profile} />
					<PrivateRoute exact path="/" component={Dashboard} />
					<Route component={NoMatch} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
