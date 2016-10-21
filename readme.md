# ng-submission [![Build Status](https://travis-ci.org/ajoslin/ng-submission.svg?branch=master)](https://travis-ci.org/ajoslin/ng-submission)

> Keep track of pending/error states in Angular

## Install

```
$ npm install --save ng-submission
```


## Usage

```js
angular.module('myapp', [
  require('ng-submission')
])
  .controller('MyController', MyController)

function MyController ($http, ngSubmission) {
  var self = this

  this.submission = ngSubmission()

  this.postForm = function (data) {
    console.log(this.submission) // => {pending: false, error: null}

    const promise = submission.submit($http.post('/submit', {data: data}))

    console.log(this.submission) // => {pending: true, error: null}

    return promise
      .then(function (response) {
        console.log(self.submission) // => {pending: false, error: null}
      })
      .catch(function (error) {
        console.log(self.submission) // => {pending: false, error: error}
      })
  }
}
```

## Setup

Include 'ng-submission' in your angular module's dependencies:

```js
// node module exports the string 'ng-submission' for convenience
angular.module('myApp', [
  require('ng-submission')
])
// otherwise, include the code first then the module name
angular.module('myApp', [
  'ng-submission'
])
```

## API

#### service: `ngSubmission`: `function ()` -> `submission`

Exposes the 'ngSubmission' service, which is a function that returns a new `submission` instance.

#### `submission`

Is an object, with three properties:

- `submission.submit: function(promise)` - A function that takes a promise and starts a new submission.
- `submission.pending: Boolean` - whether the submit is pending
- `submission.error: Object|null` - if the previous submit errored, the error object from that submission. Otherwise, null.

## License

MIT © [Andrew Joslin](http://ajoslin.com)
