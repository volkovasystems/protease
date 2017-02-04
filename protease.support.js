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

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var falzy = require("falzy");
var harden = require("harden");
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

	var entityType = protype(entity);
	if (!entityType.OBJECT && !entityType.FUNCTION) {
		throw new Error("invalid entity");
	}

	var name = "";
	var prototype = null;
	if (entityType.FUNCTION) {
		name = entity.name;
		prototype = entity.prototype;
	} else if (entityType.OBJECT) {
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

		if (!(name in chain)) {
			chain.push(prototype);
			chain.harden(name, prototype);
		}
	}

	return chain;
};

module.exports = protease;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb3RlYXNlLmpzIl0sIm5hbWVzIjpbImZhbHp5IiwicmVxdWlyZSIsImhhcmRlbiIsInByb3R5cGUiLCJGVU5DVElPTl9DTEFTUyIsIk9CSkVDVF9DTEFTUyIsInByb3RlYXNlIiwiZW50aXR5IiwiZW50aXR5VHlwZSIsIk9CSkVDVCIsIkZVTkNUSU9OIiwiRXJyb3IiLCJuYW1lIiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJjaGFpbiIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeURBLElBQU1BLFFBQVFDLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUMsU0FBU0QsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNRSxVQUFVRixRQUFTLFNBQVQsQ0FBaEI7O0FBRUEsSUFBTUcsaUJBQWlCLFVBQXZCO0FBQ0EsSUFBTUMsZUFBZSxRQUFyQjs7QUFFQSxJQUFNQyxXQUFXLFNBQVNBLFFBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCO0FBQzNDOzs7Ozs7Ozs7OztBQVdBLEtBQUlDLGFBQWFMLFFBQVNJLE1BQVQsQ0FBakI7QUFDQSxLQUFJLENBQUNDLFdBQVdDLE1BQVosSUFBc0IsQ0FBQ0QsV0FBV0UsUUFBdEMsRUFBZ0Q7QUFDL0MsUUFBTSxJQUFJQyxLQUFKLENBQVcsZ0JBQVgsQ0FBTjtBQUNBOztBQUVELEtBQUlDLE9BQU8sRUFBWDtBQUNBLEtBQUlDLFlBQVksSUFBaEI7QUFDQSxLQUFJTCxXQUFXRSxRQUFmLEVBQXlCO0FBQ3hCRSxTQUFPTCxPQUFPSyxJQUFkO0FBQ0FDLGNBQVlOLE9BQU9NLFNBQW5CO0FBRUEsRUFKRCxNQUlNLElBQUlMLFdBQVdDLE1BQWYsRUFBdUI7QUFDNUJHLFNBQU9MLE9BQU9PLFdBQVAsQ0FBbUJGLElBQTFCO0FBQ0FDLGNBQVksOEJBQXVCTixNQUF2QixDQUFaO0FBQ0E7O0FBRUQsS0FBSVAsTUFBT1ksSUFBUCxDQUFKLEVBQW1CO0FBQ2xCLFFBQU0sSUFBSUQsS0FBSixDQUFXLG1DQUFYLENBQU47QUFDQTs7QUFFRCxLQUFJLENBQUNSLFFBQVNVLFNBQVQsRUFBb0JKLE1BQXBCLENBQUwsRUFBbUM7QUFDbEMsUUFBTSxJQUFJRSxLQUFKLENBQVcsa0NBQVgsQ0FBTjtBQUNBOztBQUVELEtBQUlDLFNBQVNSLGNBQVQsSUFBMkJRLFNBQVNQLFlBQXhDLEVBQXNEO0FBQ3JELFNBQU8sRUFBUDtBQUNBOztBQUVELEtBQUlVLFFBQVFiLE9BQVFVLElBQVIsRUFBY0MsU0FBZCxFQUF5QixDQUFFQSxTQUFGLENBQXpCLENBQVo7O0FBRUEsUUFBT0EsWUFBWSw4QkFBdUJBLFNBQXZCLENBQW5CLEVBQXVEO0FBQ3RERCxTQUFPQyxVQUFVQyxXQUFWLENBQXNCRixJQUE3Qjs7QUFFQTs7Ozs7QUFLQSxNQUFJQSxTQUFTUixjQUFULElBQTJCUSxTQUFTUCxZQUF4QyxFQUFzRDtBQUNyRDtBQUNBOztBQUVELE1BQUksRUFBR08sUUFBUUcsS0FBWCxDQUFKLEVBQXdCO0FBQ3ZCQSxTQUFNQyxJQUFOLENBQVlILFNBQVo7QUFDQUUsU0FBTWIsTUFBTixDQUFjVSxJQUFkLEVBQW9CQyxTQUFwQjtBQUNBO0FBQ0Q7O0FBRUQsUUFBT0UsS0FBUDtBQUNBLENBN0REOztBQStEQUUsT0FBT0MsT0FBUCxHQUFpQlosUUFBakIiLCJmaWxlIjoicHJvdGVhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyo7XG5cdEBtb2R1bGUtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXG5cblx0QG1vZHVsZS1jb25maWd1cmF0aW9uOlxuXHRcdHtcblx0XHRcdFwicGFja2FnZVwiOiBcInByb3RlYXNlXCIsXG5cdFx0XHRcInBhdGhcIjogXCJwcm90ZWFzZS9wcm90ZWFzZS5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwicHJvdGVhc2UuanNcIixcblx0XHRcdFwibW9kdWxlXCI6IFwicHJvdGVhc2VcIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiXG5cdFx0XHRdLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9wcm90ZWFzZS5naXRcIixcblx0XHRcdFwidGVzdFwiOiBcInByb3RlYXNlLXRlc3QuanNcIixcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcblx0XHR9XG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0UHJvdG90eXBlIGNoYWluIHdpdGggbG9va3VwLlxuXHRAZW5kLW1vZHVsZS1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJmYWx6eVwiOiBcImZhbHp5XCIsXG5cdFx0XHRcImhhcmRlblwiOiBcImhhcmRlblwiLFxuXHRcdFx0XCJwcm90eXBlXCI6IFwicHJvdHlwZVwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGZhbHp5ID0gcmVxdWlyZSggXCJmYWx6eVwiICk7XG5jb25zdCBoYXJkZW4gPSByZXF1aXJlKCBcImhhcmRlblwiICk7XG5jb25zdCBwcm90eXBlID0gcmVxdWlyZSggXCJwcm90eXBlXCIgKTtcblxuY29uc3QgRlVOQ1RJT05fQ0xBU1MgPSBcIkZ1bmN0aW9uXCI7XG5jb25zdCBPQkpFQ1RfQ0xBU1MgPSBcIk9iamVjdFwiO1xuXG5jb25zdCBwcm90ZWFzZSA9IGZ1bmN0aW9uIHByb3RlYXNlKCBlbnRpdHkgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJlbnRpdHk6cmVxdWlyZWRcIjogW1xuXHRcdFx0XHRcdFwib2JqZWN0XCIsXG5cdFx0XHRcdFx0XCJmdW5jdGlvblwiXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGxldCBlbnRpdHlUeXBlID0gcHJvdHlwZSggZW50aXR5ICk7XG5cdGlmKCAhZW50aXR5VHlwZS5PQkpFQ1QgJiYgIWVudGl0eVR5cGUuRlVOQ1RJT04gKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBlbnRpdHlcIiApO1xuXHR9XG5cblx0bGV0IG5hbWUgPSBcIlwiO1xuXHRsZXQgcHJvdG90eXBlID0gbnVsbDtcblx0aWYoIGVudGl0eVR5cGUuRlVOQ1RJT04gKXtcblx0XHRuYW1lID0gZW50aXR5Lm5hbWU7XG5cdFx0cHJvdG90eXBlID0gZW50aXR5LnByb3RvdHlwZTtcblxuXHR9ZWxzZSBpZiggZW50aXR5VHlwZS5PQkpFQ1QgKXtcblx0XHRuYW1lID0gZW50aXR5LmNvbnN0cnVjdG9yLm5hbWU7XG5cdFx0cHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKCBlbnRpdHkgKTtcblx0fVxuXG5cdGlmKCBmYWx6eSggbmFtZSApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImNhbm5vdCBleHRyYWN0IGluaXRpYWwgY2hhaW4gbmFtZVwiICk7XG5cdH1cblxuXHRpZiggIXByb3R5cGUoIHByb3RvdHlwZSwgT0JKRUNUICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiY2Fubm90IGV4dHJhY3QgaW5pdGlhbCBwcm90b3R5cGVcIiApO1xuXHR9XG5cblx0aWYoIG5hbWUgPT09IEZVTkNUSU9OX0NMQVNTIHx8IG5hbWUgPT09IE9CSkVDVF9DTEFTUyApe1xuXHRcdHJldHVybiBbIF07XG5cdH1cblxuXHRsZXQgY2hhaW4gPSBoYXJkZW4oIG5hbWUsIHByb3RvdHlwZSwgWyBwcm90b3R5cGUgXSApO1xuXG5cdHdoaWxlKCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoIHByb3RvdHlwZSApICl7XG5cdFx0bmFtZSA9IHByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lO1xuXG5cdFx0Lyo7XG5cdFx0XHRAbm90ZTpcblx0XHRcdFx0RGlzY2FyZCByb290IG9mIHRoZSBjaGFpbi5cblx0XHRcdEBlbmQtbm90ZVxuXHRcdCovXG5cdFx0aWYoIG5hbWUgPT09IEZVTkNUSU9OX0NMQVNTIHx8IG5hbWUgPT09IE9CSkVDVF9DTEFTUyApe1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYoICEoIG5hbWUgaW4gY2hhaW4gKSApe1xuXHRcdFx0Y2hhaW4ucHVzaCggcHJvdG90eXBlICk7XG5cdFx0XHRjaGFpbi5oYXJkZW4oIG5hbWUsIHByb3RvdHlwZSApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjaGFpbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvdGVhc2U7XG4iXX0=
