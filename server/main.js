Meteor.startup(() => {
  // code to run on server at startup
    console.log('Server is running ... n disturbing');
});

Meteor.publish("resolutions", function () {
   return Resolutions.find({});
});
