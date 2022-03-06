import "./Homepage.css";
import logo from "../../images/navbarlogo.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  const history = useHistory();
  const LoggingOut = () => {
    //NotificationManager.success("Logging Out");
    history.push("/login");
    localStorage.removeItem("AuthToken");
  };
  return (
    <nav className="navbar nvb">
      <div className="container"
      style={{marginTop: "10px", marginBottom: "10px"}}>
        <div>
          <a className="navbar-brand" href="#">
            <img src={logo} width="40" height="45" alt="" />
          </a>
        </div>
        <small className="text-white" onClick = {()=>LoggingOut()} style={{cursor:"pointer", textDecoration: "none"}}>
            <h6> Signout</h6>
        </small>
      </div>
    </nav>
  );
};

export default Navbar;
