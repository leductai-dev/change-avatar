import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contacts from "./components/Contacts";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Contacts} />
      </Switch>
    </Router>
  );
}

export default App;
