import "./Post.css"
import React from "react";

const Post = (props) => {
  const labels = props.task.labels.split(",");
  return (
    <div>
      <div className="card mt-4">
        <div className="card-body">
          <div className="container d-flex justify-content-between cardd">
            <div className="d-flex">
                <h6 className="my-auto mx-3">{props.task.desc}</h6>
                {/* It will iterate through all labels */}
                {labels.map(
                  (label)=>{ return <span className="badge bdge">{label}</span>
                })}
            </div>
            <div className="d-flex">
                <h6 className="my-auto mx-3">{props.task.priority}</h6>
                <i className="fa fa-pencil-square-o fa-lg my-auto ficon" aria-hidden="true" ></i>
                <i className="fa fa-trash my-auto fa-lg ficon" aria-hidden="true"></i>
                
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Post;
