Nbsp.updateColor = function() {
  var red = Session.get('red'),
      green = Session.get('green'),
      blue = Session.get('blue');
  $('body').css({
    'background-color': 'rgb(' + red + ', ' + green + ', ' + blue + ')'
  });
}

if (Meteor.isClient) {

  Session.setDefault('red', 0);
  Session.setDefault('green', 0);
  Session.setDefault('blue', 0);

  Template.form.onCreated(function() {
    Nbsp.updateColor();
  });

  Template.form.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.form.events({
    'change input': function (event) {
      Session.set(event.target.id, event.target.value)

      Nbsp.updateColor();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    let hueSettings = Meteor.settings.hue || Meteor.settings.public.hue;
    if (!hueSettings) {
      throw new Meteor.Error(500, "Hue credentials not available.");
    }
    Nbsp.hue = new HueBridge(hueSettings.server, hueSettings.username);
  });
}
