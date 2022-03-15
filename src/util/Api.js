import axios from 'axios';
//baseURL: "http://g-axon.work/jwtauth/api",
export default axios.create({
  baseURL: "https://www.blackstones-spa.com/api/api",
  headers: {
     'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  }
});
