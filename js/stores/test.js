var Reflux = require('reflux');
var Actions = require('./../actions');
var request = require('browser-request');

var testStore = Reflux.createStore({

  init: function() {
    this.listenTo(Actions.testCancelled, this.cancelTest);
    console.log('initted');
  },

  cancelTest: function(testId) {
    var self = this;
    console.log(testId);
    request({method:'POST', url:'http://coral-reef.azurewebsites.net/test/' + testId + '/actions', json:{type:'cancelled'}}, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        self.trigger(testId);
      }
    });
  }

});

module.exports = testStore;
