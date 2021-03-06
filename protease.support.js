"use strict";

/*;
              	@module-license:
              		The MIT License (MIT)
              		@mit-license
              
              		Copyright (@c) 2017 Richeve Siodina Bebedor
              		@email: richeve.bebedor@gmail.com
              
              		Permission is hereby granted, free of charge, to any person obtaining a copy
              		of this software and associated documentation files (the "Software"), to deal
              		in the Software without restriction, including without limitation the rights
              		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              		copies of the Software, and to permit persons to whom the Software is
              		furnished to do so, subject to the following conditions:
              
              		The above copyright notice and this permission notice shall be included in all
              		copies or substantial portions of the Software.
              
              		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              		SOFTWARE.
              	@end-module-license
              
              	@module-configuration:
              		{
              			"package": "protease",
              			"path": "protease/protease.js",
              			"file": "protease.js",
              			"module": "protease",
              			"author": "Richeve S. Bebedor",
              			"contributors": [
              				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
              			],
              			"eMail": "richeve.bebedor@gmail.com",
              			"repository": "https://github.com/volkovasystems/protease.git",
              			"test": "protease-test.js",
              			"global": true
              		}
              	@end-module-configuration
              
              	@module-documentation:
              		Prototype chain with lookup.
              
              		This will disregard the root chain Function and Object class prototype since
              			we don't want to mess with those.
              	@end-module-documentation
              
              	@include:
              		{
              			"falzy": "falzy",
              			"fname": "fname",
              			"impel": "impel",
              			"kein": "kein",
              			"protype": "protype"
              		}
              	@end-include
              */var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var falzy = require("falzy");
var fname = require("fname");
var impel = require("impel");
var kein = require("kein");
var protype = require("protype");

var FUNCTION_CLASS = "Function";
var OBJECT_CLASS = "Object";

var protease = function protease(entity) {
	/*;
                                          	@meta-configuration:
                                          		{
                                          			"entity:required": [
                                          				"object",
                                          				"function"
                                          			]
                                          		}
                                          	@end-meta-configuration
                                          */

	if (protype(entity, OBJECT)) {
		entity = entity.constructor;
	}

	if (!protype(entity, FUNCTION)) {
		throw new Error("invalid entity");
	}

	var name = fname(entity);
	var prototype = entity.prototype;

	/*;
                                   	@note:
                                   		Possibility that the entity is anonymous therefore the prototype chain
                                   			would be function and object so there's no need to evaluate.
                                   	@end-note
                                   */
	if (falzy(name) || falzy(prototype) ||
	name === FUNCTION_CLASS || name === OBJECT_CLASS)
	{
		return [];
	}

	var chain = impel(name, prototype, [prototype]);

	while (prototype = (0, _getPrototypeOf2.default)(prototype)) {
		name = fname(prototype.constructor);

		/*;
                                       	@note:
                                       		Discard root of the chain.
                                       		The root of the chain can be the Function or Object class.
                                       	@end-note
                                       */
		if (falzy(name) || name === FUNCTION_CLASS || name === OBJECT_CLASS) {
			continue;
		}

		if (!kein(name, chain)) {
			chain.push(prototype);
			impel(name, prototype, chain);
		}
	}

	return chain;
};

module.exports = protease;

//# sourceMappingURL=protease.support.js.map