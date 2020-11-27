const inquirer = require('inquirer');
let username_, password_ = "";
const axios = require('axios');
inquirer
  .prompt([
    {
      type: "input",
      message: "Enter Your username:",
      name: "username",
    }
  ])
  .then(({ username }) => {
    username_ = username
  }).then(()=>{
    inquirer
  .prompt([
    {
      type: "password",
      mask: '•',	
      message: "Enter Your password:",
      name: "password",
    }
  ])
  .then(({ password }) => {
    password_ = password
  }).then(()=>{ig_login(username_, password_)})});

  function ig_login(username, password){
    let data = `username=${username}&enc_password=#PWD_INSTAGRAM_BROWSER:0:1:${password}&queryParams={}&optIntoOneTap=false`;const url = "https://instagram.com/accounts/login/ajax/";
    const options = {headers: {'User-Agent': 'Mozilla/5.0 (Linux; Android 10; SM-A505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.110 Mobile Safari/537.36 ', 'X-Csrftoken': 'missing', 'Accept-Language': 'en-US,en;q=0.9,ar-SA;q=0.8,ar;q=0.7', 'X-Instagram-Ajax': '1', 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded'}};
    axios.post(url, data, options).then((re)=>{if(re.data.authenticated === true){re.headers["set-cookie"].forEach( (cookie_) => {var regex = /^(\w+|\w+_\w+)=(.*?)\;/ig; console.log(regex.exec(cookie_)[0])})}})}