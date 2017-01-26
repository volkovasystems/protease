"use strict";

const protease = require( "./protease.js" );

var Compute = function Compute( ){ };

Compute.prototype.resolve = function resolve( option, callback ){
	/*;
		@meta-configuration:
			{
				"option:required": "object",
				"callback:required": "function"
			}
		@end-meta-configuration
	*/

	option = option || { };

};

console.log( protease( Compute ) );
