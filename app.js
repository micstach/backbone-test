(function() {
  window.App = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {}
  };
  
  window.template = function(id) {
    return _.template($('#' + id).html());
  };


  App.Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'show/:id': 'show'
    },

    index: function() {
      var addPersonView = new App.Views.AddPerson({collection: peopleCollection, readOnly: false});
      $('.form-div').html(addPersonView.render().el);

      var peopleView = new App.Views.PeopleView({collection: peopleCollection, readOnly: true})         
      $('.people').html(peopleView.render().el);
    },

    show: function(id) {
      console.log(id);
    }
  });

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
      this.collection.on('add', this.addPerson, this);
    },

    render: function() {
      
      this.collection.each(function(person) {
        this.addPerson(person)
      }, this);

      return this;
    },

    addPerson: function(person) {
        var personView = new App.Views.PersonView( {model: person} ) ;
        this.$el.append( personView.render().el );
    }
  });

  App.Views.PersonView = Backbone.View.extend({
    tagName: 'li',

    // optional-> template: '#person-template',
    template: template('person-template'),

    initialize: function() {
      this.model.on('change:age', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    events: {
      'click': 'showAlert',
      'click .delete': 'destroy'
    },

    showAlert: function() {
      console.log('Item clicked !' + JSON.stringify(this.model.toJSON()));
      var newAge = this.model.get('age') + 1;
      this.model.set('age', newAge) ;
    },

    destroy: function() {
      this.model.destroy();
    },

    remove: function() {
      this.$el.remove();
    },

    render: function() {
      // optional->  var template = _.template( $(this.template).html() );
      this.$el.html( this.template( this.model.toJSON() ) );
      
      return this;
    }
  });

  App.Views.AddPerson = Backbone.View.extend({
    el: 'div',
    
    template: template('add-person-template'),

    initialize: function() {
    },

    events: {
      'submit': 'submit'
    },

    render: function() {
      this.$el.html( this.template() );
      
      return this;
    },

    submit: function(e) {
      e.preventDefault();

      var name = $(e.currentTarget).find('input[type=text]').val();

      var person = new App.Models.Person({name: name, age: 1});

      this.collection.add(person);
    }

  });

})() ;
