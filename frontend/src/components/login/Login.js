import "./Login.css";

import { useHistory } from "react-router-dom";
import { signin } from "../../actions/signin";
import React from "react";
import img from "../../images/todologo.png";
import { Link } from "react-router-dom";
// import SocialLogin from "./SocialLogin";

function sleep(time){
    
  return new Promise((resolve)=>setTimeout(resolve,time)
)
}

function Login() {
  let history = useHistory();

  const [inprocessing, setInprocessing] = React.useState(false);
  const [warning, setwarning] = React.useState({
    flag: true,
    errormsg: "",
  });
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!(e.target.username.value && e.target.password.value)) {
      setwarning({
        flag: true,
        errormsg: "Invalid Input",
      });
    } else {
      setInprocessing(true);
      signin(
        user,
        (error) => {
          setInprocessing(false);
          setwarning({
            flag: true,
            errormsg: error,
          });
        },
        (success) => {
          setwarning({
            flag: false,
            errormsg: 'Successfully Logged In',
          });
          localStorage.setItem('AuthToken', success.token);
          sleep(500).then(()=>{
            history.push("/");
          })
        }
      );
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 mx-auto">
          <div className="card my-5">
            <div className="mx-4 my-5">
              {/* title */}
              <div 
              className="d-flex justify-content-center">
                <img
                src={img}
                className="img-fluid"
                height="120px"
                width="120px">
                </img>
              </div>
        
              <div className="login-form mt-4">
                <form
                  className="login-form__group"
                  onSubmit={(e) => onSubmit(e)}
                >
                  {/* username */}
                  <div className="input-icons">
                    <i className="fa fa-envelope icon"></i>
                    <input
                      name="username"
                      type="text"
                      value={user.username}
                      onChange={(e) => handleChange(e)}
                      className="input-field"
                      placeholder="Username"
                    />
                  </div>
                  {/* password */}
                  <div className="input-icons">
                    <i className="fa fa-lock icon"></i>
                    <input
                      name="password"
                      type="password"
                      value={user.password}
                      onChange={(e) => handleChange(e)}
                      className="input-field"
                      placeholder="Password"
                    />
                  </div>
                  {/* warning */}
                  {warning.flag ? (
                    <div style={{ marginLeft: "20px", color: "#dc3545" }}>
                      <small> {warning.errormsg} </small>
                    </div>
                  ) : (
                    <div style={{ marginLeft: "20px", color: "#198754" }}>
                      <small> {warning.errormsg} </small>
                    </div>
                  )}

                  {/* submit button */}
                  <div className="text-center mt-4 mb-3">
                    <input
                      type="submit"
                      className={
                        inprocessing
                          ? "btn disabled"
                          : "btn"
                      }
                      style={{backgroundColor: "#0B4B36", color: "white", width: "100%"}}
                      value="Sign In"
                    />
                  </div>
                </form>
              </div>
              <div className= "d-flex justify-content-end mr-2">
              <h6>
                New here? 
              </h6>
              <Link className="ms-2 h6" style={{textDecoration: "none", color:"#0B4B36"}} to="/register">
                  <i><u>Register</u></i>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
