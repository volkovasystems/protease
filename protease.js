"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
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
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/protease.git",
			"test": "protease-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Prototype chain with lookup.

		This will follow the prototype chain through the parent property.

		Override the follow up property by passing a link.
	@end-module-documentation

	@include:
		{
			"falzy": "falzy",
			"harden": "harden"
		}
	@end-include
*/

if( typeof require == "function" ){
	var falzy = require( "falzy" );
	var harden = require( "harden" );
}

if( typeof window != "undefined" &&
	!( "harden" in window ) )
{
	throw new Error( "harden is not defined" );
}

if( typeof window != "undefined" &&
	!( "falzy" in window ) )
{
	throw new Error( "falzy is not defined" );
}

var protease = function protease( entity ){
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

	if( typeof entity != "object" && typeof entity != "function" ){
		throw new Error( "invalid entity" );
	}

	let name = "";
	let prototype = null;
	if( typeof entity == "function" ){
		name = entity.name;
		prototype = entity.prototype;

	}else if( typeof entity == "object" ){
		name = entity.constructor.name;
		prototype = Object.getPrototypeOf( entity );
	}

	if( falzy( name ) ){
		throw new Error( "cannot extract initial chain name" );
	}

	if( typeof prototype != "object" ){
		throw new Error( "cannot extract initial prototype" );
	}

	let chain = [ prototype ];
	harden( name, prototype, chain );

	while( prototype = Object.getPrototypeOf( prototype ) ){
		name = prototype.constructor.name;

		if( !( name in chain ) ){
			chain.push( prototype );
			harden( name, prototype, chain );
		}
	}

	return chain;
};

if( typeof module != "undefined" &&
	typeof module.exports != "undefined" )
{
	module.exports = protease;
}
