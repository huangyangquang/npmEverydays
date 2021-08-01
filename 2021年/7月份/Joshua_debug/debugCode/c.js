
const aPkg = require('aPkg')
const bPkg = require('aPkg')
const cPkg = require('aPkg')

exports.log = log
exports.debug = debug
exports.test = test
exports.init = init
exports.color = []
exports.obj = {}

// c的处理逻辑

function log () { /** **/ }
function debug () { /** **/ }
function test () { /** **/ }
function init () { /** **/ }

module.exports = require('./common.js')(exports)