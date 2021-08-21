const { default: axios } = require("axios");
const client = require("../config/dbconfig");

exports.viewProfile = async (req, res) => {
  // Fetch from Oauth
  try {
    var options = {
      method: "GET",
      url: "https://advicehub.us.auth0.com/api/v2/users",
      params: { q: `nickname: "${req.body.userName}"`, search_engine: "v3" },
      headers: { authorization: `Bearer ${process.env.OAUTH_TOKEN}` },
    };
    const { data } = await axios.request(options);
    //
    res.send(data);
  } catch (error) {
    console.log(error)
    // if not found send message
    res
      .status(404)
      .json({ message: "something went wrong", data: req.body.userName });
  }
};
