(function() {
  window.App = {
    Models: {},
    Collections: {},
    Views: {}
  };
  
  window.template = function(id) {
    return _.template($('#' + id).html());
  };

  App.Models.Person = Backbone.Model.extend({
    defaults: {
      name: 'John Doe',
      age: 30,
      occupation: 'worker'
    }
  });

  App.Collections.PeopleCollection = Backbone.Collection.extend({
    model: App.Models.Person
  });

  App.Views.PeopleView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function() {
      console.log(this);
    },

    render: function() {
      
      this.collection.each(function(person) {
        var personView = new App.Views.PersonView( {model: person} ) ;
        this.$el.append( personView.render().el );
      }, this);

      return this;
    }
  });

  App.Views.PersonView = Backbone.View.extend({
    tagName: 'li',

    // optional-> template: '#person-template',
    template: template('person-template'),

    events: {
      'click': 'showAlert'
    },

    showAlert: function() {
      console.log('Item clicked !' + JSON.stringify(this.model.toJSON()));
    },

    render: function() {
      // optional->  var template = _.template( $(this.template).html() );
      this.$el.html( this.template( this.model.toJSON() ) );
      
      return this;
    }
  });

})() ;
