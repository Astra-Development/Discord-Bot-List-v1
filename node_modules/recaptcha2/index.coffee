request = require 'request'

ERRORS =
  'request-error': 'Api request failed.'
  'missing-input-secret': 'The secret parameter is missing.'
  'invalid-input-secret': 'The secret parameter is invalid or malformed.'
  'missing-input-response': 'The response parameter is missing.'
  'invalid-input-response': 'The response parameter is invalid or malformed.'

GOOGLE_CAPTCHA_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify"

DEFAULT_CONFIG =
  siteKey: null
  secretKey: null
  ssl: true

DEFAULT_REQUEST_OPTIONS =
  uri: GOOGLE_CAPTCHA_ENDPOINT
  method: "POST"
  json: true
  form: {}


escapeAttribute=(atr)->
  return atr.replace(/"/g,"&quot;").replace(/[\r\n]+/g," ")

class Recaptcha2

  apiEndpoint: GOOGLE_CAPTCHA_ENDPOINT

  constructor: (config)->
    @config = Object.assign {}, DEFAULT_CONFIG, config
    @apiEndpoint = @apiEndpoint.replace "https", "http"  if @config.ssl is false

  getRequestOptions: (body)->
    body.secret = @config.secretKey
    Object.assign {}, DEFAULT_REQUEST_OPTIONS,
      uri: @apiEndpoint
      form: body

  validate: (response, remoteip)->
    new Promise (resolve, reject)=>
      return reject ['missing-input-response']  if not response
      options = @getRequestOptions {response, remoteip}
      request options, (error, response, body)->
        return reject ['request-error', error.toString()]  if error
        return resolve true  if body.success is true
        reject body['error-codes']

  validateRequest: (req, ip)->
    return @validate req.body['g-recaptcha-response'], ip

  translateErrors: (errorCodes)->
    return (ERRORS[errorCodes] or errorCodes)  if not Array.isArray errorCodes
    readableErrors = []
    for key in errorCodes
      readableErrors.push (ERRORS[key] or key)
    readableErrors

  formElement: (htmlClass = 'g-recaptcha')->
    '<div class="' + escapeAttribute(htmlClass) + '" data-sitekey="' + escapeAttribute(@config.siteKey) + '"></div>'

module.exports = Recaptcha2