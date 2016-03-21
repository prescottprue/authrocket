process.env.NODE_ENV = 'test'

var chai = global.chai = require('chai')
var expect = global.expect = chai.expect
var should = global.should = chai.should()
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

var sinon = global.sinon = require('sinon')
// var nock = global.nock = require('nock')

var Promise = require('es6-promise').Promise
global.Promise = Promise

// var jsdom = require('jsdom')
// var doc = jsdom.jsdom('<html><body></body></html>')
// var win = doc.defaultView
// global.document = doc
// global.window = win
// global.navigator = win.navigator
