'use strict'

var request = require('request')

function ArrayStore(url, username, password){
  if(!(this instanceof ArrayStore)) return new ArrayStore(url, username, password)
  this._url = url
  this._auth = {username: username, password: password}
  this._cache = {}
}

ArrayStore.prototype._makeRequest = function(method, url, data, cb){
  request({
    method: method,
    url: this._url.server + url,
    body: data,
    auth: this._auth,
    headers: {
      'Content-Type': 'text/plain'
    }
  }, function (error, response, body){
    if(!error && response.statusCode === 200) cb(null, body)
    else if(!error && response.statusCode === 401) cb('not authorized')
    else cb(error)
  })
}

ArrayStore.prototype.getStoreKeys = function(cb){

}

ArrayStore.prototype.clearStore = function(cb){

}

ArrayStore.prototype.newArray = function(cb){

}

ArrayStore.prototype.getArray = function(id){
  return this._cache[id] || this._cache[id] = new SArray(this, id)
}

function SArray(store, id){
  if(!(this instanceof SArray)) return new SArray(store, id)
  this._store = id
  this._id = id
}


SArray.prototype.push = function(data, cb){

}

SArray.prototype.pop = function(cb){

}

SArray.prototype.unshift = function(data, cb){

}

SArray.prototype.shift = function(cb){

}

SArray.prototype.slice = function(begin, end, cb){

}

SArray.prototype.indexOf = function(searchElement, fromIndex, cb){

}

SArray.prototype.set = function(pos, data, cb){

}

SArray.prototype.get = function(pos, cb){

}

SArray.prototype.remove = function(pos, cb){

}

SArray.prototype.removeArray = function(cb){

}

SArray.prototype.getArray = function(cb){

}

module.exports = ArrayStore
