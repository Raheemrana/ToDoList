import "./App.css";
import Homepage from "./components/homepage/Homepage.js";
import Login from "./components/login/Login.js";
import Signup from "./components/signup/Signup.js";

import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
function App() {

  return (
    <Router>
      <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Signup} />
      </Switch>
  </Router>
  );
}

export default App;
