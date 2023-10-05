require("dotenv").config();
const express = require("express");

//To parse and stringify query strings.
const querystring = require("querystring");

const app = express();
const port = 8888;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  // Initialize an empty string to store the generated characters.
  let text = "";

  // Define the set of characters that can be used in the random string.
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Loop for the specified length to generate characters.
  for (let i = 0; i < length; i++) {
    // Generate a random index within the range of possible characters, then
    // Append the randomly selected character to the text string.
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//The state query param is kind of a security measure — it protects against attacks such as cross-site request forgery
const stateKey = "spotify_auth_state";

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  //stored locally as a key value pair for multiple purpose. i.e., maintaining session info, user auth,etc.
  res.cookie(stateKey, state);

  //Read access to user’s subscription details (type of user account). 	Read access to user’s email address.
  const scope = "user-read-private user_read_email";

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
  });
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
