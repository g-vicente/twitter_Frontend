import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Index from "./components/Index";
import NoMatch from "./components/NoMatch";

function App() {
	return (
		<Router>
			<div className="App bg-dark bg-gradient">
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route path="/:username" component={Profile} />
					<Route path="/signup" component={SignUp} />
					<Route path="/signin" component={SignIn} />
					<Route path="/index" component={Index} />
					<Route component={NoMatch} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
