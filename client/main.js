Meteor.subscribe("resolutions");

Template.body.helpers({
	resolutions: function() {
        if (Session.get('hide-Finished')){
            return Resolutions.find({checked: {$ne: true}});
        }else{
            return Resolutions.find({});
        }
        //return Resolutions.find({});
	},
    hideFinished: function(){
        return Session.get('hide-Finished');
    }
});

Template.body.events({
	'submit .new-resolution': function (event) {
        var title = event.target.title.value;
        Meteor.call("addResolution", title);
        event.target.title.value = "";
        return false;
    },
    'change .hide-finished': function(event){
        Session.set('hide-Finished', event.target.checked);
    }
});


Template.resolution.events({
    'click .delete': function (){
        Meteor.call("deleteResolution", this._id);
    },
    'click .toggle-checked': function (){
        Meteor.call("updateResolution", this._id, !this.checked);
    },
    'click .toggle-private': function (){
        Meteor.call("setPrivate", this._id, !this.private);
    }
});

Template.resolution.helpers({
    isOwner: function() {
        return this.owner === Meteor.userId();
    }
});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});