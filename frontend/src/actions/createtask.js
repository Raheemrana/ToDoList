import axios from "axios"

export const createtask = (data, callbackerr, callbacksuccess) =>{

    data.token = localStorage.getItem('AuthToken');
    axios.post('http://localhost:5000/task/create', data)
  .then(function (res) {
    callbacksuccess(res);
  }).catch(function(err){
      callbackerr(err);
  })
}