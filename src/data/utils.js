// class ErrorResponse {
//   constructor(headers, url, status, statusText, body) {
//     this.headers = headers;
//     this.url = url;
//     this.status = status;
//     this.statusText = statusText;
//     this.body = body;
//
//     try {
//       this.json = JSON.parse(this.body);
//     } catch (e) {
//       this.json = 5;
//     }
//   }
// }

export function processResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return response.text().then(text => {
    const headers = [];
    const error = {
      headers,
      url: response.url,
      status: response.status,
      statusText: response.statusText,
      body: text,
    };
    return { _error: error };
  });
}

export function formatNumber(n, f = 2, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (f > 0 ? '\\.' : '$') + ')';
  return n.toFixed(Math.max(0, ~~f)).replace(new RegExp(re, 'g'), '$&,');
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
