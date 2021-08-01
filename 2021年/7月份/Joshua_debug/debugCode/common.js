
const aPkg = require('aPkg')
const bPkg = require('aPkg')
const cPkg = require('aPkg')

function setup (env) {
	// ...
	
	// 共有的部分 
	createSomeThing.save = save
	createSomeThing.add = add
	createSomeThing.clear = clear
	createSomeThing.remove = remove
	createSomeThing.arrNumber = []
	createSomeThing.cache = {}

	// 差异的部分
	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});


	
	function createSomeThing () {

		function init() {



		}

		return init;

	}

	return createSomeThing;
}

module.exports = setup