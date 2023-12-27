{
  var token = "";
}

function setToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  var counter = 0;
  token = "";
  while (counter < 16) {
    token += characters.charAt(Math.floor(Math.random() * 62));
    counter += 1;
  }
}

function getToken() {
  return token;
}
