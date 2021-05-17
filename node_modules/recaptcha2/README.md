# reCAPTCHA2
Easy verifier for Google reCAPTCHA version 2 for Node.js

## How to use

### Step 1: Setup reCAPTCHA on your site

You need to receive your site key and secret key for your domain from https://www.google.com/recaptcha/intro/.

Follow the steps on this page to include the reCAPTCHA on your website.

### Step 2: Initialize verifier
```js
var reCAPTCHA = require('recaptcha2');

var recaptcha = new reCAPTCHA({
  siteKey: 'your-site-key', // retrieved during setup
  secretKey: 'your-secret-key' // retrieved during setup
  ssl: false // optional, defaults to true.
             // Disable if you don't want to access
             // the Google API via a secure connection
});
```

### Step 3: Verifying the reCAPTCHA response

reCAPTCHA2 uses promises to validate the reCAPTCHA response, you can use one of the following methods:
* please mention on catch, library passes error codes from google which you can translate with translateErrors method

#### Simple usage:
```js
recaptcha.validate(key)
  .then(function(){
    // validated and secure
  })
  .catch(function(errorCodes){
    // invalid
    console.log(recaptcha.translateErrors(errorCodes)); // translate error codes to human readable text
  });
```
**Optional:** You can also pass the clients IP address to the validate method after the key. For more information on that, please see the [reCAPTCHA documentation](https://developers.google.com/recaptcha/docs/verify).

#### For use with Express (you need body-parser):
```js
function submitForm(req, res) {
  recaptcha.validateRequest(req)
    .then(function(){
      // validated and secure
      res.json({formSubmit:true})
    })
    .catch(function(errorCodes){
      // invalid
      res.json({
        formSubmit: false,
        errors: recaptcha.translateErrors(errorCodes) // translate error codes to human readable text
      });
    });
}
```

### Generating the reCAPTCHA widget

`recaptcha.formElement()` returns standard form element for reCAPTCHA which you should include at the end of your html form element.

You can also set CSS classes like this: `recaptcha.formElement('custom-class-for-recaptcha')`.
The default class is `g-recaptcha`.

```html
<div class="custom-class-for-recaptcha" data-sitekey="your-site-key"></div>
```

## Changelog

Please see the [CHANGELOG.md](CHANGELOG.md).
