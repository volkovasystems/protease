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
              	@end-module-documentation
              
              	@include:
              		{
              			"falzy": "falzy",
              			"harden": "harden",
              			"protype": "protype"
              		}
              	@end-include
              */var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var falzy = require("falzy");
var harden = require("harden");
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

	var type = protype(entity);
	if (!type.OBJECT && !type.FUNCTION) {
		throw new Error("invalid entity");
	}

	var name = "";
	var prototype = null;
	if (type.FUNCTION) {
		name = entity.name;
		prototype = entity.prototype;

	} else if (type.OBJECT) {
		name = entity.constructor.name;
		prototype = (0, _getPrototypeOf2.default)(entity);
	}

	if (falzy(name)) {
		throw new Error("cannot extract initial chain name");
	}

	if (!protype(prototype, OBJECT)) {
		throw new Error("cannot extract initial prototype");
	}

	if (name === FUNCTION_CLASS || name === OBJECT_CLASS) {
		return [];
	}

	var chain = harden(name, prototype, [prototype]);

	while (prototype = (0, _getPrototypeOf2.default)(prototype)) {
		name = prototype.constructor.name;

		/*;
                                     	@note:
                                     		Discard root of the chain.
                                     	@end-note
                                     */
		if (name === FUNCTION_CLASS || name === OBJECT_CLASS) {
			continue;
		}

		if (!kein(name, chain)) {
			chain.push(prototype);
			chain.harden(name, prototype);
		}
	}

	return chain;
};

module.exports = protease;

//# sourceMappingURL=protease.support.js.map