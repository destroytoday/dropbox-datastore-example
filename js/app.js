(function() {
  var App,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App = (function(_super) {
    __extends(App, _super);

    App.prototype.el = $('#app');

    function App() {
      var _this = this;
      this.client = new Dropbox.Client({
        key: APP_KEY
      });
      this.client.authenticate({
        interactive: false
      }, function(error) {
        if (error) {
          return alert("authentication error: " + error);
        }
      });
      if (this.client.isAuthenticated()) {
        console.log('authenticated!');
        this.openDatastore();
      } else {
        this.client.authenticate();
      }
    }

    App.prototype.openDatastore = function() {
      this.datastoreManager = this.client.getDatastoreManager();
      return this.datastoreManager.openDefaultDatastore(function(error, datastore) {
        if (!error) {
          return console.log('opened datastore');
        } else {
          return console.log("error opening default datastore: " + error);
        }
      });
    };

    return App;

  })(Spine.Controller);

  $(function() {
    return new App;
  });

}).call(this);
