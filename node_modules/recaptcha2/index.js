(function() {
  var DEFAULT_CONFIG, DEFAULT_REQUEST_OPTIONS, ERRORS, GOOGLE_CAPTCHA_ENDPOINT, Recaptcha2, escapeAttribute, request;

  request = require('request');

  ERRORS = {
    'request-error': 'Api request failed.',
    'missing-input-secret': 'The secret parameter is missing.',
    'invalid-input-secret': 'The secret parameter is invalid or malformed.',
    'missing-input-response': 'The response parameter is missing.',
    'invalid-input-response': 'The response parameter is invalid or malformed.'
  };

  GOOGLE_CAPTCHA_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify";

  DEFAULT_CONFIG = {
    siteKey: null,
    secretKey: null,
    ssl: true
  };

  DEFAULT_REQUEST_OPTIONS = {
    uri: GOOGLE_CAPTCHA_ENDPOINT,
    method: "POST",
    json: true,
    form: {}
  };

  escapeAttribute = function(atr) {
    return atr.replace(/"/g, "&quot;").replace(/[\r\n]/g, " ");
  };

  Recaptcha2 = (function() {
    class Recaptcha2 {
      constructor(config) {
        this.config = Object.assign({}, DEFAULT_CONFIG, config);
        if (this.config.ssl === false) {
          this.apiEndpoint = this.apiEndpoint.replace("https", "http");
        }
      }

      getRequestOptions(body) {
        body.secret = this.config.secretKey;
        return Object.assign({}, DEFAULT_REQUEST_OPTIONS, {
          uri: this.apiEndpoint,
          form: body
        });
      }

      validate(response, remoteip) {
        return new Promise((resolve, reject) => {
          var options;
          if (!response) {
            return reject(['missing-input-response']);
          }
          options = this.getRequestOptions({response, remoteip});
          return request(options, function(error, response, body) {
            if (error) {
              return reject(['request-error', error.toString()]);
            }
            if (body.success === true) {
              return resolve(true);
            }
            return reject(body['error-codes']);
          });
        });
      }

      validateRequest(req, ip) {
        return this.validate(req.body['g-recaptcha-response'], ip);
      }

      translateErrors(errorCodes) {
        var i, key, len, readableErrors;
        if (!Array.isArray(errorCodes)) {
          return ERRORS[errorCodes] || errorCodes;
        }
        readableErrors = [];
        for (i = 0, len = errorCodes.length; i < len; i++) {
          key = errorCodes[i];
          readableErrors.push(ERRORS[key] || key);
        }
        return readableErrors;
      }

      formElement(htmlClass = 'g-recaptcha') {
        return '<div class="' + escapeAttribute(htmlClass) + '" data-sitekey="' + escapeAttribute(this.config.siteKey) + '"></div>';
      }

    };

    Recaptcha2.prototype.apiEndpoint = GOOGLE_CAPTCHA_ENDPOINT;

    return Recaptcha2;

  }).call(this);

  module.exports = Recaptcha2;

}).call(this);
