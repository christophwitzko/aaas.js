'use strict'

var request = require('request')

function ArrayStore(options){
  if(!(this instanceof ArrayStore)) return new ArrayStore(options)
  if(typeof options === 'string') options = {server: options}
  if(!options || !options.server) throw new Error('no server set')
  if(Array.prototype.slice.call(options.server).pop() !== '/') options.server += '/'
  if(!/^https?:\/\//i.test(options.server)) options.server = 'http://' + options.server
  this.config = {server: options.server, username: options.username, password: options.password}
  this._cache = {}
}

ArrayStore.prototype._makeRequest = function(method, url, data, cb){
  if(typeof data === 'function') {
    cb = data
    data = null
  }
  request({
    method: method,
    url: this.config.server + (url || ''),
    body: data,
    auth: this.config,
    headers: {
      'Content-Type': 'text/plain'
    }
  }, function (error, response, body){
    if(!error && response.statusCode === 200) return cb(null, JSON.parse(body))
    else if(!error && response.statusCode === 401) return cb('not authorized')
    cb(error)
  })
}

ArrayStore.prototype.getStoreKeys = function(cb){
  this._makeRequest('GET', '', cb)
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
