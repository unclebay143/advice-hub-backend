const client = require("../config/dbConfig");

exports.createAdvice = async (req, res) => {
  try {
    const {
      heading,
      description,
      category,
      authorUsername,
      authorImageUrl,
      author_id,
    } = req.body;

    const response = await client.insert({
      table: "advices",
      records: [
        {
          heading,
          description,
          category,
          authorUsername,
          authorImageUrl,
          upvotes: [],
          downvotes: [],
          author_id,
        },
      ],
    });

    res
      .status(res.statusCode)
      .json({ message: "success", id: response.data.inserted_hashes[0] });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get advice full details
exports.allAdvice = async (req, res) => {
  /* 
  
  // Pagination logic begins (I want it as a middleware)
  
        -no idea how to pass the data from the backend to the middleware 😥 Help!!!
  
  */
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = {};

  try {
    // destructure data and rename data to allAdvice
    const { data: allAdvice } = await client.query(
      "SELECT * FROM advice_hub.advices"
    );

    /* 
    
    // Check length of the result, 
    
        -if the last index is less than the length of allAdvice, then there is a next page 
        */

    if (endIndex < allAdvice.length) {
      result.next = {
        page: page,
        limit: limit,
      };
    }

    /* 

    // Check length of the result, 
    
          -if the starting index is greater than zero there we have a previous page
    */
    if (startIndex > 0) {
      result.previous = {
        page: page,
        limit: limit,
      };
    }

    /* 
      //Pagination

          - Slice the advices based on user query request 
          
          */
    result.advices = await allAdvice
      .sort((a, b) => b.__createdtime__ - a.__createdtime__)
      .slice(startIndex, endIndex);
    res.send(result);
  } catch (error) {
    res.status(401).send(error);
  }
};

// Get advice full details
exports.adviceDetails = async (req, res) => {
  try {
    const adviceDetails = await client.searchByValue({
      table: "advices",
      searchAttribute: "id",
      searchValue: [req.body.adviceId],
      attributes: ["*"],
    });

    res.send(adviceDetails);
  } catch (error) {
    res.status(401).send(error);
  }
};

// the username of users that upvotes are saved in an array
exports.upvoteAdvice = async (req, res) => {
  const { adviceId, username } = req.body;
  try {
    // Get current advice upvotes
    const response = await client.searchByValue({
      table: "advices",
      searchAttribute: "id",
      searchValue: [req.body.adviceId],
      attributes: ["upvotes"],
    });

    // remove duplicate with set -does this make sense?
    const currentUpvoters = [...new Set(response.data[0].upvotes)];

    // Check if the user already upvoted
    const hasUpvoted = currentUpvoters.includes(username);

    // Remove user from upvoted array
    const index = currentUpvoters.indexOf(username);
    if (index > -1) {
      currentUpvoters.splice(index, 1);
    }

    // Merge/spread new upvotes to the current upvotes
    const newUpvotes = hasUpvoted
      ? [...currentUpvoters]
      : [...currentUpvoters, username];

    const options = {
      table: "advices",
      records: [
        {
          id: adviceId,
          upvotes: newUpvotes,
        },
      ],
    };

    try {
      // Update the advice record
      const response = await client.update(options);
      // notify the frontend with success text
      res.status(response.statusCode).json({ status: response.status });
    } catch (err) {
      res.send(err);
    }
  } catch (error) {
    console.error(error);
    res.status(401).send(error);
  }
};

// the username of users that upvotes are saved in an array
exports.downvoteAdvice = async (req, res) => {
  const { adviceId, username } = req.body;
  try {
    // Get current advice upvotes
    const response = await client.searchByValue({
      table: "advices",
      searchAttribute: "id",
      searchValue: [req.body.adviceId],
      attributes: ["downvotes"],
    });

    // remove duplicate with set -does this make sense?
    const currentDownvoters = [...new Set(response.data[0].downvotes)];

    // Check if the user already upvoted
    const hasUpvoted = currentDownvoters.includes(username);

    // Remove user from upvoted array
    const index = currentDownvoters.indexOf(username);
    if (index > -1) {
      currentDownvoters.splice(index, 1);
    }

    // Merge/spread new upvotes to the current upvotes
    const newDownvote = hasUpvoted
      ? [...currentDownvoters]
      : [...currentDownvoters, username];

    const options = {
      table: "advices",
      records: [
        {
          id: adviceId,
          downvotes: newDownvote,
        },
      ],
    };

    try {
      // Update the advice record
      const response = await client.update(options);
      // notify the frontend with success text
      res.status(response.statusCode).json({ status: response.status });
    } catch (err) {
      res.send(err);
    }
  } catch (error) {
    console.error(error);
    res.status(401).send(error);
  }
};

// Function to get a single user advices
exports.advicesByUser = async (req, res) => {
  try {
    const response = await client.searchByValue({
      table: "advices",
      searchAttribute: "authorUsername",
      searchValue: [req.body.username],
      attributes: ["*"],
    });
    res.send(response);
  } catch (error) {
    res.status(500).json(error);
  }
};
