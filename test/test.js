'use strict'

var dotenv = require('dotenv')
var aaas = require('../')

dotenv.load()

var service = aaas({server: 'https://aaas-test.herokuapp.com/', username: process.env.USERNAME, password: process.env.PASSWORD})

service.getStoreKeys(function(err, data){
  if(err) return console.log(err)
  console.log(data.keys)
})
