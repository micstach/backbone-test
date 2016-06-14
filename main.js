// main.js
var Person = Backbone.Model.extend({
  defaults: {
    name: 'John Doe',
    age: 30,
    occupation: 'worker'
  }
  //,
  // validate: function(attrs) {
  //   if ( attrs.age < 0 ) {
  //     return "Age must be positive";
  //   }

  //   if ( !attrs.name ) {
  //     return "Person need a correct name";
  //   }
  // },

  // work: function() {
  //   if ( this.get('occupation') ) {
  //     return this.get('name') + " is working";
  //   } else { 
  //     return this.get('name') + " is not working";
  //   }
  // }
});

var PersonView = Backbone.View.extend({
  tagName: 'li',

  template: _.template("<strong><%= name %></strong> (<%= age %>)"),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html( this.template(this.model.toJSON()) );
  }
});

var person = new Person();

var personView = new PersonView({model: person});

$(document).ready(function(){ 
  $(document.body).append(personView.$el);
});