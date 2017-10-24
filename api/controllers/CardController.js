/**
 * CardController
 *
 * @description :: Server-side logic for managing cards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: function (req, res) {
		let addcard = function(){
	    	return new Promise(function(fullfill, reject){
	    		Card.create({
	    			title: req.body.title,
	    			description: req.body.description
	    		}).exec(function(err, card){
	    			if(err) return reject(err);
	    			if(!card) return reject();
	    			return fullfill(card.id);
	    		})
	    	})
	    }
	    let addtag = function(id_card){
	    	return new Promise(function(fullfill, reject){
	    		function dequy(list, i){
	    			if(list.length <= i){
	    				return fullfill();
	    			}
	    			Tag.create({
		    			name:list[i].name,
		    			card: id_card
		    		}).exec(function(err, tag){
		    			if(err) return reject(err);
		    			if(!tag) return reject();
		    			dequy(list, ++i);
		    		})
	    		}
	    		dequy(req.body.tags, 0);
	    	})
	    }
	    addcard().then(addtag).then(function(){
	    	res.json({message:'success'})
	    }).catch(function(err){
	    	res.json({message:'error'})
	    })
	},

	list: function(req, res){
		Card.find({
			pin:true
		}).populateAll().exec(function(err, _plist){
			if(err) return res.json({message:err});
			Card.find({
				where:{},
				sort:'createdAt DESC'
			}).populateAll().exec(function(_err, list){
				if(_err) return res.json({message:_err});
				return res.json({cards: list, pins: _plist, message:'success'});
			})
		})
		
	},

	delete: function(req, res){
		Card.destroy(req.body.id).exec(function(err){
			if(err) return res.json({message:'error'});
			return res.json({message:'success'});
		})
	},

	update: function(req, res){

		let destroyTag = function(){
	    	return new Promise(function(fullfill, reject){
	    		Tag.destroy({
	    			card:req.body.id
	    		}).exec(function(err){
	    			if(err) return reject(err);
	    			return fullfill();
	    		})
	    	})
	    }
	    let update = function(){
	    	return new Promise(function(fullfill, reject){
	    		Card.update({
	    			id: req.body.id
	    		}, {
	    			title:req.body.title
	    		}).exec(function(err, card){
	    			if(err) return reject(err);
	    			if(!card) return reject();
	    			return fullfill();
	    		})
	    	})
	    } 
	    let insertTag = function(){
	    	return new Promise(function(fullfill, reject){
	    		function dequy(list, i){
	    			if(list.length <= i){
	    				return fullfill();
	    			}
	    			Tag.create({
		    			name:list[i].name,
		    			card: req.body.id
		    		}).exec(function(err, tag){
		    			if(err) return reject(err);
		    			if(!tag) return reject();
		    			dequy(list, ++i);
		    		})
	    		}
	    		dequy(req.body.tag, 0);
	    	})
	    }
	    destroyTag().then(update).then(insertTag).then(function(){
	    	res.json({message:'success'})
	    }).catch(function(err){
	    	res.json({message:'error'})
	    })
	},
	pin: function(req, res){
		Card.update({
			id: req.body.id
		}, {
			pin: !req.body.pin
		}).exec(function(err, card){
			if(err) return res.json({message:'error'})
			if(!card) return res.json({message:'error'})
			return res.json({message:'success'})
		})
	}
};

