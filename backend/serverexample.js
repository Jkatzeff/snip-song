const axios = require('axios');

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const User = require("./models/user");
const Snip = require("./models/snip");
const bcrypt = require("bcrypt");



const saltRounds = 10;

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "REMOVED";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getUser", (req, res) => {
  const {username} = req.body;
  User.findOne({username: username}).then((err, user) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, user: user });
  });
});


/*verify user data*/
router.post("/verifyLogin", (req, res) => {
  const {username, passwd} = req.body;
  User.findOne({username: username}, (err, user) => {
    if (err) return res.json({ success: false, error: err });
    if(user){
      bcrypt.compare(passwd, user.passwd).then(function(result) {
        if(result === true && user.spotifyUsername!==null){
          return res.json({success: true, loggedIn: true, spotifyUsername: user.spotifyUsername})
        }
        else if(result === true){
          return res.json({success: true, loggedIn: true})
        }
        else{
          return res.json({success: true, loggedIn: false})
        }
      })
    }else{
      return res.json({success: true, loggedIn: false})
    }
  }).catch(e => console.log(e))
})

router.post("/userExists", (req, res) => {
  console.log("inside router: ")
  const {username} = req.body;
  User.findOne({username: username}).then((err, user) => {
    if( err) return res.json({success: false, error: err});
    if(user){
      return res.json({success: true, userExists: true});
    }
    else{
      return res.json({success: true, userExists: false});
    }
  })
})

router.post("/registerUser", (req, res) => {
  const {username, passwd} = req.body;
  let user = new User();
  user.username = username;
  bcrypt.hash(passwd, saltRounds).then(function(hash){
    let user = new User({username: username, passwd: hash})
    user.save(
    );
    return res.json({success: true});
  })
  
})

//Adds spotify username to existing user

router.post("/addSpotifyToUser", (req, res) => {
  const {username, spotifyUsername} = req.body;
  User.findOneAndUpdate({username: username}, {spotifyUsername: spotifyUsername}).then((err, user) => {
    if(err) return res.json({success: false, error: err});
    return res.json({success: true});
  })
})



//Snip related methods


router.post("/getNSnips", (req, res) => {
  const {username, numSnips} = req.body;
  Snip.find({}).limit(+numSnips).sort({date: -1}).exec((err, snips) => {
    if(err) return res.json({success: false, snips: []});
    return res.json({success: true, snips: snips});
  })
})

router.post("/addSnip", (req, res) => {
  try {
    const newSnip = new Snip(req.body);
    newSnip.save();
    return res.json({success: true});
  }catch(err){
    return res.json({success: false, error: err});
  }
})

// router.post("/removeSnip", (req, res) => {

// })

// this is our update method
// this method overwrites existing data in our database
// router.post("/updateUser", (req, res) => {
//   const { id, update } = req.body;
//   User.findOneAndUpdate(id, update, err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// // this is our delete method
// // this method removes existing data in our database
// router.delete("/deleteUser", (req, res) => {
//   const { id } = req.body;
//   User.findOneAndDelete(id, err => {
//     if (err) return res.send(err);
//     return res.json({ success: true });
//   });
// });

// // this is our create methid
// // this method adds new data in our database
// router.post("/putUser", (req, res) => {
//   let user = new User();

//   const { username, password } = req.body;

//   user.username = username;
//   user.passwd = password;

//   if ((!id && id !== 0) || !message) {
//     return res.json({
//       success: false,
//       error: "INVALID INPUTS"
//     });
//   }
//   user.username = username;
//   user.password = password;
//   user.save(err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`Listening on ${API_PORT}` + " (Mongo)"));


/*SPOTIFY AUTHORIZATION*/

var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'REMOVED'; // Your client id
var client_secret = 'REMOVED'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

// var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-playback-state playlist-modify-private playlist-modify-public playlist-read-collaborative playlist-read-private playlist-modify-public user-top-read'
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('http://localhost:3000/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888 (Spotify)');
app.listen(8888);
