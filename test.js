'use strict'

var test = require('tape')
var Service = require('./service')

var createSubmission = Service(Promise)

test('basic', function (t) {
  var submission = createSubmission()

  t.notOk(submission.pending)
  t.notOk(submission.error)

  var promise = new Promise((resolve) => {
    setTimeout(resolve)
  })

  submission.submit(promise)
  t.equal(submission.pending, true)
  t.notOk(submission.error)

  promise.then(() => {
    t.notOk(submission.pending)
    t.notOk(submission.error)
    t.end()
  })
})

test('error', function (t) {
  var submission = createSubmission()
  var promise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('I pity the fool!')))
  })

  submission.submit(promise)
    .catch(() => {
      t.notOk(submission.pending)
      t.ok(submission.error)
      t.equal(submission.error.message, 'I pity the fool!')

      // Submit again, it resets the state!
      submission.submit(new Promise(() => {}))
      t.ok(submission.pending)
      t.notOk(submission.error)
      t.end()
    })
})
