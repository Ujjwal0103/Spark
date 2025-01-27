const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userCtrl = {
  register: async (req, res) => {
    //requestobject and response object
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });

      if (user)
        return res.status(400).json({ msg: "Email Already Registered" });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password should be atleast 6 characters" });

      //password encryption

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      //save mongodb

      await newUser.save();

      //create jwt(json web token) to authenticate
      const accesstoken = createAccessToken({ id: newUser._id }); //jwt is used in web applications for authentication and authorization purposes.
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        //This code sets a cookie named "refreshtoken" in the HTTP response.
        // The cookie will store the value of the refreshtoken variable
        httpOnly: true,
        path: "/user/refresh_token", //limits the response to this route
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshtoken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please login or Register" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        //user contains the payload
        if (err)
          return res.status(400).json({ msg: "Please login or Register" });
        const accesstoken = createAccessToken({ id: user.id }); //if it's valid a new access token is created
        res.json({ user, accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email }); //this finds a user whose email matches with the one that is input
      if (!user) return res.status(400).json({ msg: "User does not exist" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Passwords don't match" });

      const accesstoken = createAccessToken({ id: user._id }); //as the user is sending us the id and password
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ accesstoken, msg: "Login successful!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: " Log out" });
    } catch (err) {}
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password"); //we ccan remove the password in this way
      if (!user) return res.staus(400).json({ msg: "User not found " });
      res.json(user);
    } catch (err) {}
  },
};

const createAccessToken = (payload) => {
  //payload is the actual data being processed in a request/response or database operation
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  }); // The jwt.sign function is used to create (or "sign") a JSON Web Token (JWT).
  // It generates a token by encoding a payload (data) and securing it with a signature,
  // which is created using a secret key or a private key.
};

const createRefreshToken = (payload) => {
  // Refresh token is used to obtain a new access token without requiring the user to log in again.
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userCtrl;

//http-only cookies provide a secure way to transmit refresh token.
// Since refresh tokens stored in cookies are not accessible via JavaScript, t
// they cannot be stolen by malicious scripts that may run on the client side.
