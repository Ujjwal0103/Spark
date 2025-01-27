const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authentication" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid" });

      req.user = user; //If the token is valid, the decoded user data (user) will be attached to the req object
      next(); //After the verification and attaching the user data to the request object,
      // the next() function is called to pass control to the next middleware or route handler in the chain.
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
