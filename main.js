
var Person = Backbone.Model.extend({
  defaults: {
    name: 'John Doe',
    age: 30,
    occupation: 'worker'
  }
});

var PeopleCollection = Backbone.Collection.extend({
  model: Person
});

var PeopleView = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    console.log(this);
  },

  render: function() {
    
    this.collection.each(function(person) {
      var personView = new PersonView( {model: person} ) ;
      this.$el.append( personView.render().el );
    }, this);

    return this;
  }
});

var PersonView = Backbone.View.extend({
  tagName: 'li',

  // optional-> template: '#person-template',
  template: _.template( $('#person-template').html() ),

  render: function() {
    // optional->  var template = _.template( $(this.template).html() );
    this.$el.html( this.template( this.model.toJSON() ) );
    
    return this;
  }
});

var peopleCollection = new PeopleCollection([
  {
    name: "Tosia",
    age: 6
  },
  {
    name: "Julek",
    age: 5
  }
]);

var peopleView = new PeopleView({collection: peopleCollection});

$(document).ready(function() { 

  $(document.body).append(peopleView.render().el);
});