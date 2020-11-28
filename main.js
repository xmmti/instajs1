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
    axios.post(url, data, options).then((re)=>{if(re.data.authenticated === true){re.headers["set-cookie"].forEach( (cookie_) => {var regex = /^(\w+|\w+_\w+)=(.*?)\;/ig; console.log(regex.exec(cookie_)[0])})}}).catch((error) => {
      // Error 😨
      if (error.response) {
          //console.log(error.response.data);
          if (error.response.data.message === "checkpoint_required"){
            let cookie_temp = "";
           
            error.response.headers["set-cookie"].forEach( (cookie_) => {var regex = /^(\w+|\w+_\w+)=(.*?)\;/ig; cookie_temp += regex.exec(cookie_)[0] + " "})
            ig_SecureInfo("https://i.instagram.com" + error.response.data.checkpoint_url + "?__a=1", cookie_temp.trim())
          }
          //console.log(error.response.status);
      } 
  })}
  function ig_SecureInfo(url, mid_cookie){
    axios.get(url,{ headers: {'User-Agent': 'Mozilla/5.0 (Linux; Android 9; SM-A505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.110 Mobile Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9,ar-SA;q=0.8,ar;q=0.7', 'Content-Type': 'application/x-www-form-urlencoded', 'cookie': mid_cookie}}).then((re)=>{//console.log(re.data)
      let = secure_method = [];
      if (re.data.challengeType === "SelectVerificationMethodForm"){
      re.data.extraData.content[3].fields[0].values.forEach((secure_value) =>{
        secure_method.push(secure_value.label +  " -->" + secure_value.value);
      });

       inquirer
       .prompt([
         {
           type: "list",
           choices: secure_method,
           name: "method",
         }
       ])
       .then(({ method }) => {
         ig_SecureSendcode(url, mid_cookie, method.split("-->")[1].trim())
       })
    }
    
    })
  }



  function ig_SecureSendcode(url, mid_cookie, che){
    axios.post(url.split("?")[0], `choice=${che}`, { headers: {'User-Agent': 'Mozilla/5.0 (Linux; Android 9; SM-A505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.110 Mobile Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9,ar-SA;q=0.8,ar;q=0.7', 'Content-Type': 'application/x-www-form-urlencoded', 'cookie': mid_cookie, "X-CSRFToken":"missing", "X-Requested-With":"XMLHttpRequest", "X-Instagram-AJAX":"1"}}).then((re)=>{//console.log(re.data)
      let = secure_method = [];
      if (re.data.challengeType === "VerifySMSCodeForm" || re.data.challengeType === "VerifyEmailCodeForm"){
        inquirer
        .prompt([
          {
            type: "input",
            message: re.data.fields.contact_point + " :",
            name: "code_is",
          }
        ])
        .then(({ code_is }) => {
          ig_SecureEntercode(url, mid_cookie, code_is)
        })
      }
    
    })
    
  }
  function ig_SecureEntercode(url, mid_cookie, the_code){
    axios.post(url.split("?")[0], `security_code=${the_code}`, { headers: {'User-Agent': 'Mozilla/5.0 (Linux; Android 9; SM-A505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.110 Mobile Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9,ar-SA;q=0.8,ar;q=0.7', 'Content-Type': 'application/x-www-form-urlencoded', 'cookie': mid_cookie, "X-CSRFToken":"missing", "X-Requested-With":"XMLHttpRequest", "X-Instagram-AJAX":"1"}}).then((re)=>{//console.log(re.data)
      if (re.data.type === "CHALLENGE_REDIRECTION"){
        re.headers["set-cookie"].forEach( (cookie_) => {var regex = /^(\w+|\w+_\w+)=(.*?)\;/ig; console.log(regex.exec(cookie_)[0])})
      }
    
    })}