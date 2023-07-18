// const express = require("express");
// const User = require("../models/User");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");
// var jwt = require("jsonwebtoken");
// const JWT_SECRET = "lituisagoodboy";

// const fetchuser = require("../middleware/fetchuser");
// // create User using Post:"api/auth/createuser" endpoints for createuser Aunthetication

// var bcrypt = require("bcryptjs");
// router.post(
//   "/createuser",
//   [
//     body("name", "Enter a valid Name").isLength({ min: 3 }),
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "password must be atleast 5 character").isLength({
//       min: 5,
//     }),
//   ],

//   async (req, res) => {
//     // if there are errors , return and the errors;
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//       return res.status(400).json({ error: error.array() });
//     }
//     // check wheather the user with email exits already
//     let user = await User.findOne({ email: req.body.email });
//     if (user) {
//       return res
//         .status(400)
//         .json({ error: "sorry a user with this emaill already exits" });
//     }
//     // password hashing technique generated
//     const salt = await bcrypt.genSalt(10); // genSalt is a salt generating function with 10 character

//     secPass = await bcrypt.hash(req.body.password, salt); // it returns a promise so that you need to
//     user = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: secPass,
//     });
//     const data = {
//       user: {
//         id: User.id,
//       },
//     };
//     const jwtData = jwt.sign(data, JWT_SECRET);
//     // console.log(jwtData);jsonweb token
//     res.json({ jwtData });
//     // .then((User) => res.json(User))
//     // .catch(
//     //   (erorr = () => {
//     //     console.log("Eroor  due to duplicate inputs ");
//     //   })
//     // );
//     // res.json({ error: "please enter a uniue email id for email" });
//     //or you can send like this  res.send(req.body);
//   }
// );
// // Aunthetication for api/auth/login;
// router.post(
//   "/login",
//   [
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password can not be blank").exists(),
//   ],
//   async (req, res) => {
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//       return res.status(400).json({ error: error.array() });
//     }
//     const { email, password } = req.body;
//     try {
//       let user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ error: "internal error" });
//       }
//       const passwordCompare = await bcrypt.compare(password, user.password);
//       if (!passwordCompare) {
//         return res
//           .status(400)
//           .json({ error: "please try to login with correct credentials" });
//       }
//       const data = {
//         user: {
//           id: User.id,
//         },
//       };
//       const jwtData = jwt.sign(data, JWT_SECRET);
//       res.json({ jwtData });
//     } catch (error) {
//       return res.status(500).send("Internal error occured");
//     }
//   }
// );

// router.post(
//   "/getuser",
//   fetchuser,

//   async (req, res) => {
//     try {
//       userid = req.user.id;
//       const user = await User.findById(userid).select("-password");
//       res.send({ user });
//     } catch (error) {
//       return res.status(500).send("Internal error occured");
//     }
//   }
// );
// module.exports = router;

// // here get login userdetails
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Harryisagoodb$oy";

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
