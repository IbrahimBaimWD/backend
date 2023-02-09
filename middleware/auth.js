const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Access Denied / Unauthorized request");
  }
  try {
    token = token.split(" ")[1];
    if (token === "null" || !token) {
      return res.status(401).send("Unauthorized request");
    }
    let verifiedUser = jwt.verify(token, "testing Rendom");
    if (!verifiedUser) {
      res.status(401).send("Unauthorized request");
    }
    req.user = verifiedUser;
    next();
  } catch (error) {
    res.status(500).send("invalid Token");
  }
};
const checkRole = async (req, res, next) => {
  if (req.user.isAdmin === "Admin" || req.user.isAdmin === "SuperAdmin") {
    return next();
  }
  return res.status(403).send("Forbidden & Role is not ADMIN");
};
const checkRoleSuper = async (req, res, next) => {
  if (req.user.isAdmin === "SuperAdmin") {
    return next();
  }
  return res.status(403).send("Forbidden & Role is not SUPERADMIN");
};

module.exports = { verifyToken, checkRole, checkRoleSuper };
