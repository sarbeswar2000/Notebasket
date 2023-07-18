// const jwt = require("jsonwebtoken");
// const JWT_SECRET = "lituisagoodboy";

// const fetchuser = (req, res, next) => {
//   // get the user form the jwt token adn add id to req object
//   const token = req.header("jwtData");
//   if (!token) {
//     res.status(401).send({ error: "please authenticate using a valid token" });
//   }

//   try {
//     const data = jwt.verify(token, JWT_SECRET);
//     req.user = data.user;
//     next();
//   } catch (error) {
//     return res.status(500).send("Internal error occured");
//   }
// };
// module.exports = fetchuser;
var jwt = require("jsonwebtoken");
const JWT_SECRET = "Harryisagoodb$oy";

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
