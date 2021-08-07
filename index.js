const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Import Routes
const adviceRoutes = require("./routes/adviceRoute");

// Use routes
app.use("/advice", adviceRoutes);

// Handle unknown route
app.use((req, res, next) => {
  const error = new Error(
    `Sorry can't find ${req.originalUrl} on the server 😫😫`
  );
  throw error;
});

const port = process.env.PORT || 3020;

app.listen(port, () => {
  console.log(`Server is 🏃‍♂️ on port ${port}
    `);
});
