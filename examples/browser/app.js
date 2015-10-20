var authrocket = new AuthRocket({
  jsUrl: 'https://tessellate.e1.loginrocket.com/v1/',
  accountId: 'org_0vFdP9Zc11Y7yucwRTSCg8',
  apiKey: 'key_AAAe02TUpGzBNgkrLkXYi6j57tmaiU0ll27NEvDRjBq',
  realmId: 'rl_0vFhopfukY34r8EPGmKVpb'
});
console.log('authrocket:', authrocket);
//Set logged in status when dom is loaded
document.addEventListener("DOMContentLoaded", function(event) {
  setStatus();
});
//Set status styles
function setStatus() {
  var statusEl = document.getElementById("status");
  var logoutButton = document.getElementById("logout-btn");

  if(authrocket.isLoggedIn){
    statusEl.innerHTML = "True";
    statusEl.style.color = 'green';
    // statusEl.className = statusEl.className ? ' status-loggedIn' : 'status-loggedIn';
    logoutButton.style.display='inline';
  } else {
    statusEl.innerHTML = "False";
    statusEl.style.color = 'red';
    logoutButton.style.display='none';
  }
}

function login(loginData){
  if(!loginData){
    var loginData = {};
    loginData.username = document.getElementById('login-username').value;
    loginData.password = document.getElementById('login-password').value;
  }
  authrocket.login(loginData).then(function(loginInfo){
    console.log('successful login:', loginInfo);
    setStatus();
  }, function(err){
    console.error('login() : Error logging in:', err);
  });
}
function logout(){
  authrocket.logout().then(function(){
    console.log('successful logout');
    setStatus();
  }, function(err){
    console.error('logout() : Error logging out:', err);
  });
}
function signup(signupData){
  if(!signupData){
    var signupData = {};
    signupData.name = document.getElementById('signup-name').value;
    signupData.username = document.getElementById('signup-username').value;
    signupData.email = document.getElementById('signup-email').value;
    signupData.password = document.getElementById('signup-password').value;
  }
  authrocket.signup(signupData).then(function(signupRes){
    console.log('successful signup', signupRes);
    setStatus();
  }, function(err){
    console.error('logout() : Error signing up:', err);
  });
}
function getUsers(){
  authrocket.Users.get().then(function(usersList){
    console.log('users loaded', usersList);
  }, function(err){
    console.error('error getting users', err);
  });
}
