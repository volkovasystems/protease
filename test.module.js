"use strict";

/*;
	@test-license:
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
	@end-test-license

	@test-configuration:
		{
			"package": "protease",
			"path": "protease/test.module.js",
			"file": "test.module.js",
			"module": "test",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/protease.git"
		}
	@end-test-configuration

	@test-documentation:

	@end-test-documentation

	@include:
		{
			"assert": "should/as-function",
			"protease": "protease"
		}
	@end-include
*/

const assert = require( "should/as-function" );

//: @server:
const protease = require( "./protease.js" );
//: @end-server

//: @client:
const protease = require( "./protease.support.js" );
//: @end-client

//: @bridge:
const path = require( "path" );
//: @end-bridge


//: @server:
describe( "protease", ( ) => {

	describe( "`protease( Array )`", ( ) => {
		it( "should be equal to [ Array.prototype ]", ( ) => {
			assert.deepEqual( protease( Array ), [ Array.prototype ] );
		} );
	} );

	describe( "`protease( { 'name': 'hello' } )`", ( ) => {
		it( "should be equal to empty array", ( ) => {
			assert.deepEqual( protease( { "name": "hello" } ), [ ] );
		} );
	} );

} );
//: @end-server


//: @client:
describe( "protease", ( ) => {

	describe( "`protease( Array )`", ( ) => {
		it( "should be equal to [ Array.prototype ]", ( ) => {
			assert.deepEqual( protease( Array ), [ Array.prototype ] );
		} );
	} );

	describe( "`protease( { 'name': 'hello' } )`", ( ) => {
		it( "should be equal to empty array", ( ) => {
			assert.deepEqual( protease( { "name": "hello" } ), [ ] );
		} );
	} );

} );
//: @end-client


//: @bridge:
describe( "protease", ( ) => {

	let bridgeURL = `file://${ path.resolve( __dirname, "bridge.html" ) }`;

	describe( "`protease( Array )`", ( ) => {
		it( "should be equal to [ Array.prototype ]", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					return protease( Array ).length == 1;
				}

			).value;
			//: @end-ignore
			
			assert.equal( result, true );
		} );
	} );

	describe( "`protease( { 'name': 'hello' } )`", ( ) => {
		it( "should be equal to empty array", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					return JSON.stringify( protease( { "name": "hello" } ) );
				}

			).value;
			//: @end-ignore

			assert.deepEqual( JSON.parse( result ), [ ] );
		} );
	} );

} );
//: @end-bridge