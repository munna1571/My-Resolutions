Meteor.methods({
    addResolution: function (title){
        Resolutions.insert({
            title: title,
            createdAt: new Date(),
            owner: Meteor.userId()
        });
    },
    deleteResolution: function(id){
        Resolutions.remove(id);
    },
    updateResolution: function(id, checked){
        Resolutions.update(id, {$set: {checked: checked}});
    },
    setPrivate: function(id, action){
        var res =  Resolutions.findOne(id);
        if( res.owner !== Meteor.userId() ){
            throw new Meteor.Error('not-authorized');
        }
        Resolutions.update(id, {$set: {private: action}});
    }
});