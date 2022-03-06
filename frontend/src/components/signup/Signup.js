import "./Signup.css";

import { useHistory } from "react-router-dom";
import { signup } from "../../actions/signup";
import React from "react";
import img from "../../images/todologo.png";
import { Link } from "react-router-dom";
// import SocialLogin from "./SocialLogin";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function Signup() {
  let history = useHistory();

  const [inprocessing, setInprocessing] = React.useState(false);
  const [warning, setwarning] = React.useState({
    flag: true,
    errormsg: "",
  });
  const [user, setUser] = React.useState({
    username: "",
    password: "",
    email: "",
    confirmpassword: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !(
        e.target.username.value &&
        e.target.email.value &&
        e.target.password.value
      )
    ) {
      setwarning({
        flag: true,
        errormsg: "Invalid Input",
      });
    } else if (e.target.password.value !== e.target.confirmpassword.value) {
      setwarning({
        flag: true,
        errormsg: "Both passwords are not same",
      });
    } else {
      delete user.confirmpassword;
      setInprocessing(true);
      signup(
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
            errormsg: 'Registered successfully!',
          });
          sleep(500).then(()=>{
            history.push("/login");
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
              <div className="d-flex justify-content-center">
                <img
                  src={img}
                  className="img-fluid"
                  height="120px"
                  width="120px"
                ></img>
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
                  <div className="input-icons">
                    <i className="fa fa-envelope icon"></i>
                    <input
                      name="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => handleChange(e)}
                      className="input-field"
                      placeholder="Email"
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
                  {/* Confirm Password */}
                  <div className="input-icons">
                    <i className="fa fa-lock icon"></i>
                    <input
                      name="confirmpassword"
                      type="password"
                      value={user.confirmpassword}
                      onChange={(e) => handleChange(e)}
                      className="input-field"
                      placeholder="Confirm Password"
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
                      className={inprocessing ? "btn disabled subbtn" : "btn subbtn"}
                      
                      value="Sign In"
                    />
                  </div>
                </form>
              </div>
              <div className="d-flex justify-content-end mr-2">
                <h6>Already a member?</h6>
                <Link
                  className="ms-2 h6"
                  style={{ textDecoration: "none", color: "#0B4B36" }}
                  to="/login"
                >
                  <i>
                    <u>Log In</u>
                  </i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
