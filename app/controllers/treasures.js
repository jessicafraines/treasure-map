'use strict';

var Treasure = require('../models/treasure'),
    mp       = require('multiparty');

exports.init = function(req, res){
  res.render('treasures/init');
};

exports.index = function(req, res){
  Treasure.all(function(err, treasures){
    res.render('treasures/index', {treasures:treasures});
  });

};
exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, file){
    Treasure.create(fields, function(err, newTreasure){
      newTreasure.uploadPhoto(file, function(){
        res.redirect('/treasures');
      });
    });
  });
};

exports.show = function(req, res){
  Treasure.findById(req.params.id, function(treasure){
    res.render('treasures/show', {treasure:treasure});
  });
};

exports.isFound = function(req, res){
  Treasure.findById(req.params.id, function(treasure){
    treasure.toggle();
    treasure.save(function(){
      res.redirect('/treasures');
    });
  });
};
