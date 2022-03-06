import axios from "axios"

export const signup = (user, callbackerr, callbacksuccess) =>{
    axios.post('http://localhost:5000/auth/register', user)
  .then(function (response) {
    callbacksuccess('Successfully Registered')
  }).catch(function(error){
      callbackerr(error.response.data);
  })
}