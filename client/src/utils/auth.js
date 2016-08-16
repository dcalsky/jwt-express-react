import request from 'superagent'

module.exports = ({method, url, body, auth = null, success}) => {
  let r
  console.log(method)
  switch (method) {
    case 'POST':
      console.log('post')
      r = request.post(url)
      break
    case 'GET':
      r = request.get(url)
      break
  }
  r.send(body)
    .set('Authorization', auth)
    .set('Content-Type', 'application/json')
    .end(success);
}
