import "./App.css";
import LeftPanel from "./components/LeftPanel";
import Dashboard from "./components/Dashboard";
import RightPanel from "./components/RightPanel";

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col-3">
          <LeftPanel />
        </div>
        <div className="col-6">
          <Dashboard />
        </div>
        <div className="col-3">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
