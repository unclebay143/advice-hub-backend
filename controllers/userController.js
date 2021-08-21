const { default: axios } = require("axios");
var request = require("request");

exports.viewProfile = async (req, res) => {
  var options = {
    method: "POST",
    url: "https://advicehub.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: `{"client_id":"${process.env.OAUTH_CLIENT_ID}","client_secret":"${process.env.OAUTH_CLIENT_SECRET}","audience":"${process.env.OAUTH_API}","grant_type":"client_credentials"}`,
  };

  // Get token
  request(options, async function (error, response, body) {
    if (error) throw new Error(error);

    // Body is string
    const parsedBody = JSON.parse(body);
    const access_token = parsedBody.access_token;

    if (access_token) {
      try {
        var options = {
          method: "GET",
          url: "https://advicehub.us.auth0.com/api/v2/users",
          params: {
            q: `nickname: "${req.body.userName}"`,
            search_engine: "v3",
          },
          headers: { authorization: `Bearer ${access_token}` },
        };
        const { data } = await axios.request(options);
        //
        res.send(data);
      } catch (error) {
        console.log(error);
        // if not found send message
        res
          .status(404)
          .json({ message: "something went wrong", data: req.body.userName });
      }
    }
  });
};
