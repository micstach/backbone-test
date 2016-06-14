var peopleCollection = new App.Collections.PeopleCollection([
  {
    name: "Tosia",
    age: 6
  },
  {
    name: "Julek",
    age: 5
  }
]);

// router


$(document).ready(function() { 
 
  new App.Router(); 
  Backbone.history.start() ;
  
});

