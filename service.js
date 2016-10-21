module.exports = SubmissionService

SubmissionService.$inject = ['$q']
function SubmissionService ($q) {
  return function createSubmission () {
    var _currentPromise
    var state = {
      pending: false,
      error: null,
      submit
    }

    return state

    function submit (promise) {
      state.pending = true
      state.error = null
      _currentPromise = promise

      return promise
        .then(function (result) {
          if (_currentPromise === promise) {
            state.pending = false
          }
          return $q.resolve(result)
        })
        .catch(function (error) {
          if (_currentPromise === promise) {
            state.pending = false
            state.error = error
          }
          return $q.reject(error)
        })
    }
  }
}
