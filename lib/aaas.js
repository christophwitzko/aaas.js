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
  if(typeof data === 'function'){
    cb = data
    data = null
  }
  if(typeof cb !== 'function') throw new Error('no callback set')
  request({
    method: method,
    url: this.config.server + (url || ''),
    body: data,
    auth: this.config,
    headers: {
      'Content-Type': 'text/plain'
    }
  }, function (error, response, body){
    if(!error && response.statusCode === 200){
      var pdata = JSON.parse(body)
      return cb(pdata.error || null, pdata)
    }
    if(!error && response.statusCode === 401) return cb('not authorized')
    cb(error)
  })
}

ArrayStore.prototype.getStoreKeys = function(cb){
  this._makeRequest('GET', '', cb)
}

ArrayStore.prototype.clearStore = function(cb){
  this._makeRequest('DELETE', '', cb)
}

ArrayStore.prototype.newArray = function(cb){
  var self = this
  self._makeRequest('POST', '', function(err, data){
    if(err) return cb(err)
    self._cache[data.id] = new SArray(self, data.id)
    cb(null, self._cache[data.id])
  })
}

ArrayStore.prototype.getArray = function(id){
  return this._cache[id] || this._cache[id] = new SArray(this, id)
}

function SArray(store, id){
  if(!(this instanceof SArray)) return new SArray(store, id)
  this._store = store
  this._id = id
}

SArray.prototype._makeRequest = function(method, url, data, cb){
  if(url && url.length > 0) url = '/' + url
  this._store._makeRequest(method, this._id + url, data, cb)
}

SArray.prototype.push = function(data, cb){
  this._makeRequest('POST', 'push', data, cb)
}

SArray.prototype.pop = function(cb){
  this._makeRequest('GET', 'pop', cb)
}

SArray.prototype.unshift = function(data, cb){
  this._makeRequest('POST', 'unshift', data, cb)
}

SArray.prototype.shift = function(cb){
  this._makeRequest('GET', 'shift', cb)
}

SArray.prototype.slice = function(begin, end, cb){
  if(typeof begin === 'undefined' || typeof end === 'undefined') throw new Error('begin and end missing')
  this._makeRequest('GET', begin + '/' + end, cb)
}

SArray.prototype.indexOf = function(searchElement, fromIndex, cb){
  if(typeof searchElement === 'undefined') throw new Error('search element missing')
  if(typeof fromIndex === 'function'){
    cb = fromIndex
    fromIndex = ''
  }
  else fromIndex += ''
  if(fromIndex && fromIndex.length > 0) fromIndex = '/' + fromIndex
  this._makeRequest('POST', 'indexof' + fromIndex, searchElement, cb)
}

SArray.prototype.set = function(pos, data, cb){
  if(typeof pos === 'undefined') throw new Error('position missing')
  this._makeRequest('POST', pos + '', data, cb)
}

SArray.prototype.get = function(pos, cb){
  if(typeof pos === 'undefined') throw new Error('position missing')
  this._makeRequest('GET', pos + '', cb)
}

SArray.prototype.remove = function(pos, cb){
  if(typeof pos === 'undefined') throw new Error('position missing')
  this._makeRequest('DELETE', pos + '', cb)
}

SArray.prototype.removeArray = function(cb){
  this._makeRequest('DELETE', '', cb)
  delete this._store._cache[this._id]
}

SArray.prototype.getArray = function(cb){
  this._makeRequest('GET', '', cb)
}

module.exports = ArrayStore
