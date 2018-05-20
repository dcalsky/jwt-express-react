module.exports = {
  port: 3000,
  db: {
    name: "login",
    user: "dcalsky",
    password: "react"
  },
  role: {
    admin: 2,
    normal: 1
  },
  token: {
    secret: "yoursecret",
    expired: "1d"
  },
  errCode: {
    1000: "USER_NOT_EXISTED",
    1001: "WRONG_PASSWORD",
    1002: "PERMISSION_DENIED"
  }
};
