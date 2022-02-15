const SpotifyWebApi = require("spotify-web-api-node");
//___GETS AUTH CODE FROM CLIENT AND SENDS BACK ACCESSTOKEN + REFRESHTOKEN
exports.getAccessToken = (req, res, next) => {
  // Getting authorization code from the client URL
  const code = req.body.code;
  let credentials = {
    clientId: "a20026b3038c4dac8c664ace9f0f4c8e",
    clientSecret: "8dbef8b8bef34831a2346022d626ebba",
    redirectUri: "http://localhost:3000",
  };
  const spotifyApi = new SpotifyWebApi(credentials);

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      // Send back accessToken for API calls
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};

//___GETS REFRESHTOKEN FROM CLIENT AND SENDS BACK ANOTHER ACCESSTOKEN
exports.refreshAccessToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  let credentials = {
    clientId: "a20026b3038c4dac8c664ace9f0f4c8e",
    clientSecret: "8dbef8b8bef34831a2346022d626ebba",
    redirectUri: "http://localhost:3000",
    refreshToken,
  };
  const spotifyApi = new SpotifyWebApi(credentials);

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
};
