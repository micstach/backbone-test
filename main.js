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

var peopleView = new App.Views.PeopleView({collection: peopleCollection});

$(document).ready(function() { 
  $('.people').html(peopleView.render().el);
});

