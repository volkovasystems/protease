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

	var chain = harden(name, prototype, [prototype]);

	while (prototype = (0, _getPrototypeOf2.default)(prototype)) {
		name = prototype.constructor.name;

		/*;
  	@note:
  		Discard root of the chain.
  	@end-note
  */
		if (name === "Function" || name === "Object") {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb3RlYXNlLmpzIl0sIm5hbWVzIjpbImZhbHp5IiwicmVxdWlyZSIsImhhcmRlbiIsInByb3R5cGUiLCJwcm90ZWFzZSIsImVudGl0eSIsImVudGl0eVR5cGUiLCJPQkpFQ1QiLCJGVU5DVElPTiIsIkVycm9yIiwibmFtZSIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwiY2hhaW4iLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlEQSxJQUFNQSxRQUFRQyxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1DLFNBQVNELFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUUsVUFBVUYsUUFBUyxTQUFULENBQWhCOztBQUVBLElBQU1HLFdBQVcsU0FBU0EsUUFBVCxDQUFtQkMsTUFBbkIsRUFBMkI7QUFDM0M7Ozs7Ozs7Ozs7O0FBV0EsS0FBSUMsYUFBYUgsUUFBU0UsTUFBVCxDQUFqQjtBQUNBLEtBQUksQ0FBQ0MsV0FBV0MsTUFBWixJQUFzQixDQUFDRCxXQUFXRSxRQUF0QyxFQUFnRDtBQUMvQyxRQUFNLElBQUlDLEtBQUosQ0FBVyxnQkFBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBSUMsT0FBTyxFQUFYO0FBQ0EsS0FBSUMsWUFBWSxJQUFoQjtBQUNBLEtBQUlMLFdBQVdFLFFBQWYsRUFBeUI7QUFDeEJFLFNBQU9MLE9BQU9LLElBQWQ7QUFDQUMsY0FBWU4sT0FBT00sU0FBbkI7QUFFQSxFQUpELE1BSU0sSUFBSUwsV0FBV0MsTUFBZixFQUF1QjtBQUM1QkcsU0FBT0wsT0FBT08sV0FBUCxDQUFtQkYsSUFBMUI7QUFDQUMsY0FBWSw4QkFBdUJOLE1BQXZCLENBQVo7QUFDQTs7QUFFRCxLQUFJTCxNQUFPVSxJQUFQLENBQUosRUFBbUI7QUFDbEIsUUFBTSxJQUFJRCxLQUFKLENBQVcsbUNBQVgsQ0FBTjtBQUNBOztBQUVELEtBQUksQ0FBQ04sUUFBU1EsU0FBVCxFQUFvQkosTUFBcEIsQ0FBTCxFQUFtQztBQUNsQyxRQUFNLElBQUlFLEtBQUosQ0FBVyxrQ0FBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBSUksUUFBUVgsT0FBUVEsSUFBUixFQUFjQyxTQUFkLEVBQXlCLENBQUVBLFNBQUYsQ0FBekIsQ0FBWjs7QUFFQSxRQUFPQSxZQUFZLDhCQUF1QkEsU0FBdkIsQ0FBbkIsRUFBdUQ7QUFDdERELFNBQU9DLFVBQVVDLFdBQVYsQ0FBc0JGLElBQTdCOztBQUVBOzs7OztBQUtBLE1BQUlBLFNBQVMsVUFBVCxJQUF1QkEsU0FBUyxRQUFwQyxFQUE4QztBQUM3QztBQUNBOztBQUVELE1BQUksRUFBR0EsUUFBUUcsS0FBWCxDQUFKLEVBQXdCO0FBQ3ZCQSxTQUFNQyxJQUFOLENBQVlILFNBQVo7QUFDQUUsU0FBTVgsTUFBTixDQUFjUSxJQUFkLEVBQW9CQyxTQUFwQjtBQUNBO0FBQ0Q7O0FBRUQsUUFBT0UsS0FBUDtBQUNBLENBekREOztBQTJEQUUsT0FBT0MsT0FBUCxHQUFpQlosUUFBakIiLCJmaWxlIjoicHJvdGVhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyo7XG5cdEBtb2R1bGUtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXG5cblx0QG1vZHVsZS1jb25maWd1cmF0aW9uOlxuXHRcdHtcblx0XHRcdFwicGFja2FnZVwiOiBcInByb3RlYXNlXCIsXG5cdFx0XHRcInBhdGhcIjogXCJwcm90ZWFzZS9wcm90ZWFzZS5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwicHJvdGVhc2UuanNcIixcblx0XHRcdFwibW9kdWxlXCI6IFwicHJvdGVhc2VcIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiXG5cdFx0XHRdLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9wcm90ZWFzZS5naXRcIixcblx0XHRcdFwidGVzdFwiOiBcInByb3RlYXNlLXRlc3QuanNcIixcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcblx0XHR9XG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0UHJvdG90eXBlIGNoYWluIHdpdGggbG9va3VwLlxuXHRAZW5kLW1vZHVsZS1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJmYWx6eVwiOiBcImZhbHp5XCIsXG5cdFx0XHRcImhhcmRlblwiOiBcImhhcmRlblwiLFxuXHRcdFx0XCJwcm90eXBlXCI6IFwicHJvdHlwZVwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGZhbHp5ID0gcmVxdWlyZSggXCJmYWx6eVwiICk7XG5jb25zdCBoYXJkZW4gPSByZXF1aXJlKCBcImhhcmRlblwiICk7XG5jb25zdCBwcm90eXBlID0gcmVxdWlyZSggXCJwcm90eXBlXCIgKTtcblxuY29uc3QgcHJvdGVhc2UgPSBmdW5jdGlvbiBwcm90ZWFzZSggZW50aXR5ICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwiZW50aXR5OnJlcXVpcmVkXCI6IFtcblx0XHRcdFx0XHRcIm9iamVjdFwiLFxuXHRcdFx0XHRcdFwiZnVuY3Rpb25cIlxuXHRcdFx0XHRdXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRsZXQgZW50aXR5VHlwZSA9IHByb3R5cGUoIGVudGl0eSApO1xuXHRpZiggIWVudGl0eVR5cGUuT0JKRUNUICYmICFlbnRpdHlUeXBlLkZVTkNUSU9OICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgZW50aXR5XCIgKTtcblx0fVxuXG5cdGxldCBuYW1lID0gXCJcIjtcblx0bGV0IHByb3RvdHlwZSA9IG51bGw7XG5cdGlmKCBlbnRpdHlUeXBlLkZVTkNUSU9OICl7XG5cdFx0bmFtZSA9IGVudGl0eS5uYW1lO1xuXHRcdHByb3RvdHlwZSA9IGVudGl0eS5wcm90b3R5cGU7XG5cblx0fWVsc2UgaWYoIGVudGl0eVR5cGUuT0JKRUNUICl7XG5cdFx0bmFtZSA9IGVudGl0eS5jb25zdHJ1Y3Rvci5uYW1lO1xuXHRcdHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiggZW50aXR5ICk7XG5cdH1cblxuXHRpZiggZmFsenkoIG5hbWUgKSApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJjYW5ub3QgZXh0cmFjdCBpbml0aWFsIGNoYWluIG5hbWVcIiApO1xuXHR9XG5cblx0aWYoICFwcm90eXBlKCBwcm90b3R5cGUsIE9CSkVDVCApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImNhbm5vdCBleHRyYWN0IGluaXRpYWwgcHJvdG90eXBlXCIgKTtcblx0fVxuXG5cdGxldCBjaGFpbiA9IGhhcmRlbiggbmFtZSwgcHJvdG90eXBlLCBbIHByb3RvdHlwZSBdICk7XG5cblx0d2hpbGUoIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiggcHJvdG90eXBlICkgKXtcblx0XHRuYW1lID0gcHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWU7XG5cblx0XHQvKjtcblx0XHRcdEBub3RlOlxuXHRcdFx0XHREaXNjYXJkIHJvb3Qgb2YgdGhlIGNoYWluLlxuXHRcdFx0QGVuZC1ub3RlXG5cdFx0Ki9cblx0XHRpZiggbmFtZSA9PT0gXCJGdW5jdGlvblwiIHx8IG5hbWUgPT09IFwiT2JqZWN0XCIgKXtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmKCAhKCBuYW1lIGluIGNoYWluICkgKXtcblx0XHRcdGNoYWluLnB1c2goIHByb3RvdHlwZSApO1xuXHRcdFx0Y2hhaW4uaGFyZGVuKCBuYW1lLCBwcm90b3R5cGUgKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY2hhaW47XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHByb3RlYXNlO1xuIl19
