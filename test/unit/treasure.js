/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure  = require('../../app/models/treasure'),
    Mongo     = require('mongodb'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'treasures';

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var o = {tname:'gold', photo:'photo.img', loc:{name:'green bay',lat:'75.21', lng:'88.21'}, difficulty:'hard', hint:'look under the bed'},
      t = new Treasure(o);
      expect(t).to.be.instanceof(Treasure);
      expect(t.tname).to.equal('gold');
      expect(t.photo).to.equal('photo.img');
      expect(t.loc.name).to.equal('green bay');
      expect(t.loc.lat).to.equal(75.21);
      expect(t.loc.lng).to.equal(88.21);
      expect(t.difficulty).to.equal('hard');
      expect(t.hint).to.equal('look under the bed');
    });
  });

  describe('.all', function(){
    it('should get all treasure', function(done){
      Treasure.all(function(err, treasures){
        expect(treasures).to.have.length(2);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should find a treasure object by id', function(done){
      Treasure.findById('000000000000000000000001', function(treasure){
        expect(treasure).to.be.instanceof(Treasure);
        expect(treasure.tname).to.equal('gold');
        done();
      });
    });
  });
  describe('.create', function(){
    it('should create a new treasure', function(done){
      var o = {tname:'gold', photo:'photo.img', loc:{name:'green bay',lat:'75.21', lng:'88.21'}, difficulty:'hard', hint:'look under the bed'};
      Treasure.create(o, function(err, treasure){
        expect(treasure._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
});

