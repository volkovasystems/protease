
const assert = require( "assert" );
const protease = require( "./protease.js" );

assert.deepEqual( protease( RegExp ), [ RegExp.prototype ], "should have RegExp prototype" );
assert.deepEqual( protease( Function ), [ ], "should be empty" );

console.log( "ok" );
