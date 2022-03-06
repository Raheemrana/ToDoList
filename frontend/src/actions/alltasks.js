import axios from "axios"

export const alltasks = (errorr,success) =>{
    const token = localStorage.getItem('AuthToken');
    axios.get('http://localhost:5000/task/getall', {
        params: {
          token: token
        }
      })
  .then(function (res) {
    success(res)
  }).catch(function(err){
    errorr(err);
  })
}