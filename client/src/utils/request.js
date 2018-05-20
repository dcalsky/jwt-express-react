import request from "superagent";
import config from "../config";

const { URL } = config;
// Fetch version

// function parseJSON(response) {
//   return response.json()
// }
//
// module.exports = ({method, url, body, auth = null, success, failed}) => {
//   fetch(url, {
//     method: method,
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': auth
//     },
//     body: JSON.stringify(body)
//   })
//     .then(parseJSON)
//     .then(success)
//     .catch((err) => {
//       throw err
//     })
// }

// Superagent version

module.exports = ({ method = "GET", url, body, success, session = false }) => {
  const token = window.localStorage.getItem("token");
  let r;
  switch (method) {
    case "POST":
      r = request.post(URL + url);
      break;
    case "GET":
      r = request.get(URL + url);
      break;
    default:
      throw Error("Unrecognizable request method!")
  }
  r.set("Accept", "application/json").set("Content-Type", "application/json");

  if (!session) {
    r.set("Authorization", `Bearer ${token}`);
  }
  r.send(body).end(success);
};
