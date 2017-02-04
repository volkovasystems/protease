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
*/

const falzy = require( "falzy" );
const harden = require( "harden" );
const protype = require( "protype" );

const FUNCTION_CLASS = "Function";
const OBJECT_CLASS = "Object";

const protease = function protease( entity ){
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

	let entityType = protype( entity );
	if( !entityType.OBJECT && !entityType.FUNCTION ){
		throw new Error( "invalid entity" );
	}

	let name = "";
	let prototype = null;
	if( entityType.FUNCTION ){
		name = entity.name;
		prototype = entity.prototype;

	}else if( entityType.OBJECT ){
		name = entity.constructor.name;
		prototype = Object.getPrototypeOf( entity );
	}

	if( falzy( name ) ){
		throw new Error( "cannot extract initial chain name" );
	}

	if( !protype( prototype, OBJECT ) ){
		throw new Error( "cannot extract initial prototype" );
	}

	if( name === FUNCTION_CLASS || name === OBJECT_CLASS ){
		return [ ];
	}

	let chain = harden( name, prototype, [ prototype ] );

	while( prototype = Object.getPrototypeOf( prototype ) ){
		name = prototype.constructor.name;

		/*;
			@note:
				Discard root of the chain.
			@end-note
		*/
		if( name === FUNCTION_CLASS || name === OBJECT_CLASS ){
			continue;
		}

		if( !( name in chain ) ){
			chain.push( prototype );
			chain.harden( name, prototype );
		}
	}

	return chain;
};

module.exports = protease;
