const client = require("../config/db-config");

// Add bookmark
exports.bookmarkAdvice = async (req, res) => {
  const { adviceId, username } = req.body;
  const options = {
    table: "bookmarks",
    records: [
      {
        id: adviceId,
        username,
      },
    ],
  };

  try {
    const response = await client.insert(options);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Remove bookmark
exports.removeBookmarkAdvice = async (req, res) => {
  const { adviceId, username } = req.body;

  try {
    // const query = `DELETE FROM bookmarks WHERE id=${adviceId} AND username=${username}`;
    const query = `DELETE FROM advice_hub.bookmarks WHERE id="${adviceId}" AND username="${username}"`;

    const response = await client.query(query);
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all user bookmarked advices
exports.getBookedMarkAdvice = async (req, res) => {
  const options = {
    table: "bookmarks",
    searchAttribute: "username",
    searchValue: [req.body.username],
    attributes: ["id"],
  };
  try {
    // Retrieve all user bookedmarked reference -id and username
    const bookmarkedReference = await client.searchByValue(options);
    //Pull out the ids
    const adviceIdCollection = await bookmarkedReference.data.map(
      (bookmarked) => bookmarked.id
    );

    if (adviceIdCollection.length === 0) {
      res.status(200).send([]);
    }

    // option to retrieve all bookedmarked advice objects, using the id collection
    const secondOptions = {
      table: "advices",
      hashValues: adviceIdCollection,
      attributes: ["*"],
    };
    // get bookedmarked advices
    const getAdvices = await client.searchByHash(secondOptions);
    res.send(getAdvices.data);
  } catch (error) {
    res.status(500).send(error);
  }
};
