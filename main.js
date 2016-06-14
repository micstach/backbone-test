// main.js

var Person = Backbone.Model.extend({
  defaults: {
    name: 'John Doe',
    age: 30,
    occupation: 'worker'
  },

  validate: function(attrs) {
    if ( attrs.age < 0 ) {
      return "Age must be positive";
    }

    if ( !attrs.name ) {
      return "Person need a correct name";
    }
  },

  work: function() {
    if ( this.get('occupation') ) {
      return this.get('name') + " is working";
    } else { 
      return this.get('name') + " is not working";
    }
  }
});
