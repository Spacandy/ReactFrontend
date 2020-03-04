export default function makeBasicAuthHeader(req, noAuth = false) {
  if (noAuth)
    return {
      'User-Agent': req.headers['user-agent'],
    };

  return {
    'X-SessionId': req.cookies.sessionid,
    'X-CSRFToken': req.cookies.csrftoken,
    'User-Agent': req.headers['user-agent'],
  };
}
