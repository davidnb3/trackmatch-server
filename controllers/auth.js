// const SpotifyWebApi = require("spotify-web-api-node");
// //___GETS AUTH CODE FROM CLIENT AND SENDS BACK ACCESSTOKEN + REFRESHTOKEN
// exports.getAccessToken = (req, res, next) => {
//   // Getting authorization code from the client URL
//   const code = req.body.code;
//   let credentials = {
//     clientId: "a20026b3038c4dac8c664ace9f0f4c8e",
//     clientSecret: "8dbef8b8bef34831a2346022d626ebba",
//     redirectUri: "http://localhost:3000",
//   };
//   const spotifyApi = new SpotifyWebApi(credentials);

//   spotifyApi
//     .authorizationCodeGrant(code)
//     .then((data) => {
//       // Send back accessToken for API calls
//       res.json({
//         accessToken: data.body.access_token,
//         refreshToken: data.body.refresh_token,
//         expiresIn: data.body.expires_in,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(400);
//     });
// };

// //___GETS REFRESHTOKEN FROM CLIENT AND SENDS BACK ANOTHER ACCESSTOKEN
// exports.refreshAccessToken = (req, res, next) => {
//   const refreshToken = req.body.refreshToken;
//   let credentials = {
//     clientId: "a20026b3038c4dac8c664ace9f0f4c8e",
//     clientSecret: "8dbef8b8bef34831a2346022d626ebba",
//     redirectUri: "http://localhost:3000",
//     refreshToken,
//   };
//   const spotifyApi = new SpotifyWebApi(credentials);

//   spotifyApi
//     .refreshAccessToken()
//     .then((data) => {
//       res.json({
//         accessToken: data.body.access_token,
//         expiresIn: data.body.expires_in,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.sendStatus(400);
//     });
// };
const fetch = require("node-fetch");
const { URLSearchParams } = require("url");

exports.getSpotifyAccessToken = async (req, res, next) => {
  const clientId = "bcbf898173824f97a8f4d4cfbd642f06";
  const clientSecret = "c5fa29adf8d44051ad9bef1c1cbe5785";
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: params,
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json({ accessToken: data.access_token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get Spotify access token" });
  }
};
