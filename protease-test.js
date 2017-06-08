
const assert = require( "assert" );
const protease = require( "./protease.js" );

assert.deepEqual( protease( Array ), [ Array.prototype ], "should be equal" );
assert.deepEqual( protease( Date ), [ Date.prototype ], "should be equal" );
assert.deepEqual( protease( RegExp ), [ RegExp.prototype ], "should have RegExp prototype" );

function Guest( name, index ){
	this.name = name;
	return index;
};

Guest.prototype.addGuest = function addGuest( name ) {
	return name;
};

assert.deepEqual( protease( Guest ), [ Guest.prototype ], "should be equal" );

assert.deepEqual( protease( Object ), [ ], "should return empty array" );
assert.deepEqual( protease( Function ), [ ], "should return empty array" );



console.log( "ok" );
