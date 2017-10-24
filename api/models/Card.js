/**
 * Card.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	id:{
  		type: 'integer',
  		primaryKey: true,
    	autoIncrement: true
  	},
  	title:{
  		type:'text',
  		defaultsTo: ''
  	},
  	pin:{
  		type:'boolean',
  		defaultsTo: false
  	},
  	description:{
  		type:'text',
  		defaultsTo:''
  	},
  	tag:{
      collection: 'tag',
      via:'card'
    },
  },
  afterDestroy: function(destroyedRecords, cb) {
    function dequy(list, i){
      if(i >= list.length){
        return cb();
      }
      Tag.destroy({
        card: list[i].id
      }).exec(function(err){
        if(err) return cb();
        dequy(list, ++i);
      });
    }
    dequy(destroyedRecords,0);
      
  }
};

