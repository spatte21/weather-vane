
var localStorageKey = 'weather-vane:current-user';

function CurrentUser(){};
CurrentUser.prototype = (function() {
  return {

    load: function() {
      var value = localStorage.getItem(localStorageKey);
      return value && JSON.parse(value);
    },

    save: function(value) {
      localStorage.setItem(localStorageKey, value);
      return JSON.parse(value);
    },

    clear: function() {
      localStorage.removeItem(localStorageKey);
      return null;
    }
  };
})();

var currentUser = new CurrentUser();
module.exports = currentUser;
