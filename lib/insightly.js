var request = require('request');

exports.getContactList = function(apikey, callback) {
  if (apikey.length < 1) {
    var error = new Error();
    error.statusCode = 500;

    return;
  }

  var url = "https://api.insight.ly/v2/contacts";
  var auth = "Basic " + new Buffer(apikey).toString("base64");

  request(
      {
          url : url,
          headers : { "Authorization" : auth }
      },
      function (error, response, body) {
        callback(response, body);
      }
  );
};

exports.createContact = function(apikey, contact, callback) {
  if (apikey.length < 1) {
    var error = new Error();
    error.statusCode = 500;

    callback(error, null);
  }

  var url = "https://api.insight.ly/v2/contacts";
  var auth = "Basic " + new Buffer(apikey).toString("base64");

  request.post(
      {
          url: url,
          headers : { "Authorization" : auth },
          form: contact
      },
      function (error, response, body) {
          callback(response, body);
      }
  );
};
