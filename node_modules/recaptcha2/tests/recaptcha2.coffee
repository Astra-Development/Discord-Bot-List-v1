nock       = require "nock"
should     = require "should"
Recaptcha2 = require "../index.coffee"

recaptcha2 = new Recaptcha2 siteKey: "public_site_key", secretKey: "secret_key"

GOOGLE_CAPTCHA_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify"
RECAPTCHA_RESPONSE_OK =
  "success": true
  "challenge_ts": Date.now()
  "hostname": "127.0.0.1"
  "error-codes": [
    "invalid-input-response"
  ]
RECAPTCHA_RESPONSE_ERROR =
  "success": false
  "challenge_ts": Date.now()
  "hostname": "127.0.0.1"
  "error-codes": [
    "invalid-input-response",
    "invalid-input-secret"
  ]


describe "recaptcha2", ->
  
  it "has a default config", ->
    recaptcha2.config.should.eql siteKey: "public_site_key", secretKey: "secret_key", ssl: true
  
  it "has a default secure endpoint", ->
    recaptcha2.apiEndpoint.should.eql GOOGLE_CAPTCHA_ENDPOINT
  
  it "has an unsecure endpoint when ssl disabled", ->
    unsecureRecaptcha2 = new Recaptcha2 siteKey: "public_site_key", secretKey: "secret_key", ssl: false
    unsecureRecaptcha2.apiEndpoint.should.eql GOOGLE_CAPTCHA_ENDPOINT.replace("https", "http")

  describe "validate", ->
    describe "when there is a valid frontend captcha response", ->
      it "resolves as successful", ()->
        postData = response: "valid_captcha_response", remoteip: "127.0.0.1", secret: "secret_key"
        scope = nock("https://www.google.com")
        .post("/recaptcha/api/siteverify", postData).reply 200, RECAPTCHA_RESPONSE_OK
        recaptcha2.validate("valid_captcha_response", "127.0.0.1")
        .then (response)->
          response.should.eql true
        .catch (error)->
          should.not.exist error

    describe "when there is an empty frontend captcha response", ->
      it "rejects", ()->
        recaptcha2.validate("")
        .catch (errors)->
          should.exist errors
          errors.should.eql ['missing-input-response']

    describe "when there is an invalid frontend captcha response", ->
      it "rejects", ()->
        postData = response: "invalid_captcha_response", remoteip: "127.0.0.1", secret: "secret_key"
        scope = nock("https://www.google.com")
        .post("/recaptcha/api/siteverify", postData).reply 200, RECAPTCHA_RESPONSE_ERROR
        recaptcha2.validate("invalid_captcha_response", "127.0.0.1")
        .catch (errors)->
          should.exist errors
          errors.should.eql ['invalid-input-response', "invalid-input-secret"]

    describe "when there is a request error", ->
      it "rejects", ()->
        postData = response: "valid_captcha_response", remoteip: "127.0.0.1", secret: "secret_key"
        scope = nock("https://www.google.com")
        .post("/recaptcha/api/siteverify", postData).replyWithError 500
        recaptcha2.validate("valid_captcha_response", "127.0.0.1")
        .catch (errors)->
          should.exist errors
          errors.should.eql ['request-error', "Error: 500"]

  describe "validateRequest", ->
    describe "when there is a valid frontend captcha response", ->
      it "resolves as successful", ()->
        postData = response: "valid_captcha_response", remoteip: "127.0.0.1", secret: "secret_key"
        scope = nock("https://www.google.com")
        .post("/recaptcha/api/siteverify", postData).reply 200, RECAPTCHA_RESPONSE_OK
        recaptcha2.validateRequest({body: {'g-recaptcha-response': "valid_captcha_response"}}, "127.0.0.1")
        .then (response)->
          response.should.eql true
        .catch (error)->
          should.not.exist error

  describe "getRequestOptions", ->
    body = response: "g-recaptcha_frontend_response", remoteip: "origin_ip"
    
    it "returns the request options with the given form body", ->
      recaptcha2.getRequestOptions(body).should.eql
        uri: GOOGLE_CAPTCHA_ENDPOINT
        method: "POST"
        json: true
        form:
          response: "g-recaptcha_frontend_response"
          remoteip: "origin_ip"
          secret: "secret_key"

  describe "translateErrors", ->
    describe "when the given error is a string", ->  
      it "returns a verbose string error", ->
        recaptcha2.translateErrors("request-error").should.eql "Api request failed."
    
    describe "when the given error is an array", ->
      it "returns a verbose errors array", ->
        errors = [
          'missing-input-secret', 'invalid-input-secret',
          'missing-input-response', 'invalid-input-response'
        ]
        readableErrors = [
          'The secret parameter is missing.'
          'The secret parameter is invalid or malformed.'
          'The response parameter is missing.'
          'The response parameter is invalid or malformed.'
        ]
        recaptcha2.translateErrors(errors).should.eql readableErrors

  describe "formElement", ->
    describe "when there is a given html class", ->
      it "returns a div with the given class", ->
        div = '<div class="test-class class2" data-sitekey="public_site_key"></div>'
        recaptcha2.formElement("test-class class2").should.eql div

    describe "when there is no given html class", ->
      it "returns a div with the default class", ->
        div = '<div class="g-recaptcha" data-sitekey="public_site_key"></div>'
        recaptcha2.formElement().should.eql div

  describe "security tests", ->
    attackVectorClass='" OnErRor=alert(123) b="'
    attackVectorSecretKey='" OnErRor=alert(321) b="'
    insecureRecaptcha = new Recaptcha2 siteKey: attackVectorSecretKey, secretKey: "secret_key"
    describe "html class name is present", ->
      it "returns a div with the escaped class", ->
        insecureRecaptcha.formElement(attackVectorClass).should.not.containEql attackVectorClass

    describe "when sitekey is malicious", ->
      it "returns a div with the escaped sitekey", ->
        insecureRecaptcha.formElement().should.not.containEql attackVectorSecretKey
