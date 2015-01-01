'use strict'

var request = require('request')

function ArrayStore(url, username, password){
  if(!(this instanceof ArrayStore)) return new ArrayStore(url, username, password)
  this._url = url
  this._auth = {username: username, password: password}
}

ArrayStore.prototype.makeRequest = function(url, data, cb){

}

ArrayStore.prototype.getStoreKeys = function(cb){

}

ArrayStore.prototype.clearStore = function(cb){

}
ArrayStore.prototype.newArray = function(cb){

}

function SArray(store, id){
  if(!(this instanceof SArray)) return new SArray(store, id)
  this._store = id
  this._id = id
}

/*
SArray.prototype.push
SArray.prototype.pop
SArray.prototype.unshift
SArray.prototype.shift
SArray.prototype.slice
SArray.prototype.indexOf
SArray.prototype.set
SArray.prototype.get
SArray.prototype.remove
SArray.prototype.removeArray
SArray.prototype.getArray
*/

module.exports = Store
