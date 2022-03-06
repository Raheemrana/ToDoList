import React from "react";
import Navbar from "./Navbar.js";
import Post from "../post/Post.js";
import { createtask } from "../../actions/createtask";
import { alltasks } from "../../actions/alltasks";

const Homepage = () => {
  const [labels, setLabels] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [authenticated, setauthenticated] = React.useState()
  const [ref, setref] = React.useState(false)

  React.useEffect(() => {
    alltasks(
      (error) => {
        setauthenticated(false);
        console.log(error)
        setTasks([]);
      },
      function posts(success) {
        setTasks(success.data);
        setauthenticated(true);
      }
    );
  }, [ref]);

  function AddLabel(e){
    let temp  = document.getElementById('label').value
    let arr = labels;
    setLabels([...arr, temp])
    document.getElementById('label').value = ""
  }
  function OnSubmit(e){
    e.preventDefault();
    const desc_ = e.target.desc.value;
    const priority_ = e.target.priority.value
    
    if (!(e.target.desc.value && e.target.priority.value)) {
    } else {
      const data = {
        desc: desc_,
        priority : priority_,
        //coonverting the array to a plain string
        labels: labels.toString()
      }
      createtask(
        data,
        (err) => {
          console.log(err);
        },
        (succ) => {
          e.target.desc.value = ""
          e.target.priority.value = ""
          setLabels([])
          setref(!ref)
        }
      );
    };
  }


  return (
    <div className="bgd">
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <h2 style={{ color: "#0B4B36" }}>
            <b>Welcome to your to-do list! </b>
          </h2>
          <button
            type="button"
            className="btn btn-primary addbtn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalCenter"
          >
            <b>CREATE NEW TASK </b>
          </button>
        </div>
        {authenticated ? (
          <div className="mt-4">
          {tasks.map((task, i) => (
            <Post key={i} task={task}/>
          ))}
        </div>
        ) : (
          <h1>.....</h1>
        )}
        
      </div>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <form
              onSubmit={(e) => OnSubmit(e)}
              >
                <div className="form-group" style={{ color: "#0B4B36" }}>
                  <label>
                    <b>Title</b>
                  </label>
                  <input
                    type="text"
                    name = "desc"
                    className="form-control"
                    placeholder="Task title"
                  />
                  {/* <small className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group mt-2" style={{ color: "#0B4B36" }}>
                  <label
                    style={{ marginRight: "20px" }}
                  >
                    <b>Priority</b>
                  </label>
                  <label style={{ marginRight: "10px" }}>
                    <input type="radio" name="priority" value="high" />
                    <b> High </b>
                  </label>
                  <label style={{ marginRight: "10px" }}>
                    <input type="radio" name="priority" value="Medium" />
                    <b> Medium </b>
                  </label>
                  <label style={{ marginRight: "10px" }}>
                    <input type="radio" name="priority" value="Low" />
                    <b> Low </b>
                  </label>
                  <br />
                </div>

                <div className="form-group mt-2" style={{ color: "#0B4B36" }}>
                  <label>
                    <b>Labels</b>
                  </label>
                  <div className="d-flex">
                    <input
                      style={{ marginRight: "10px" }}
                      type="text"
                      id = "label"
                      name = "label"
                      className="form-control"
                      placeholder="Label"
                    />
                    <button className="btn btn-success"
                      type = "button"
                      onClick= {()=> AddLabel()}
                      style = {{backgroundColor: "#0B4B36"}}>
                      <b> ADD </b>
                    </button>
                  </div>
                  <div className= "mt-2">
                  {labels.map((t, i) => (
                  <span key = {i} className="badge bdge"> {t} </span>
                ))}
                  </div>
                  {/* <small className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="d-flex mt-4">
                  <button
                    type="submit"
                    className="btn text-white"
                    style = {{backgroundColor: "#0B4B36", width: "100%"}}
                  >
                    <b> POST </b>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
