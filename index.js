Test = new Meteor.Collection('Test');
User = new Meteor.Collection('User');

if (Meteor.isClient) {
  var testSub = Meteor.subscribe('test');
  var userSub = Meteor.subscribe('user');
  var startTime = 0;

  Template.table.data = function() {
    return Test.find({}, {
      reactive: true
    }).map(function(test) {
      test.user = User.findOne(test.user, {
        reactive: true
      });
      return test;
    });
  }

  Template.empty.status = function() {
    return {
      test: testSub.ready(),
      user: userSub.ready()
    }
  }

  Session.setDefault('show', true);
  Template.select.show = function() {
    return Session.get('show');
  }

  Template.table.events({
    'click button.off': function() {
      Session.set('show', false);
    }
  });

  Template.select.events({
    'click button.on': function() {
      startTime = (new Date).getTime();
      Session.set('show', true);
    }
  });

  Template.table.rendered = function(){
    if(startTime > 0){
      console.log((new Date).getTime() - startTime + ' ms');
    }
  }

}

if (Meteor.isServer) {

  var testIds = Test.find().map(function(doc) {
    return doc._id;
  });

  var userIds = User.find().map(function(doc) {
    return doc._id;
  });

  Meteor.publish("test", function() {
    return Test.find();
  });

  Meteor.publish("user", function() {
    return User.find();
  });



  Meteor.startup(function() {
    var tests = 300,
      users = 450;

    if (User.find().count() === 0) {
      for (i = 0; i <= users; i++) {
        User.insert({
          username: 'tesusername' + i,
          email: 'testemail' + i + '@newmeteorengine.com'
        });
      }
    }

    if (Test.find().count() === 0) {
      for (i = 0; i <= tests; i++) {
        Test.insert({
          title: 'Test title ' + i,
          message: 'Lorem ipsum dolor sit amet ' + i,
          user: User.find({}, {
            limit: 1,
            skip: Math.floor(Math.random() * users)
          }).fetch()[0]._id
        })
      }
    }

  });
}