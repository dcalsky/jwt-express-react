import request from 'superagent'

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

module.exports = ({method, url, body, auth = null, success}) => {
  let r
  switch (method) {
    case 'POST':
      r = request.post(url)
      break
    case 'GET':
      r = request.get(url)
      break
  }
  r.send(body)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('Authorization', auth)
    .end(success);
}
