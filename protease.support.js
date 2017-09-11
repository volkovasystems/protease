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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb3RlYXNlLnN1cHBvcnQuanMiXSwibmFtZXMiOlsiZmFsenkiLCJyZXF1aXJlIiwiZm5hbWUiLCJpbXBlbCIsImtlaW4iLCJwcm90eXBlIiwiRlVOQ1RJT05fQ0xBU1MiLCJPQkpFQ1RfQ0xBU1MiLCJwcm90ZWFzZSIsImVudGl0eSIsIk9CSkVDVCIsImNvbnN0cnVjdG9yIiwiRlVOQ1RJT04iLCJFcnJvciIsIm5hbWUiLCJwcm90b3R5cGUiLCJjaGFpbiIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4REEsSUFBTUEsUUFBUUMsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNQyxRQUFRRCxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1FLFFBQVFGLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUcsT0FBT0gsUUFBUyxNQUFULENBQWI7QUFDQSxJQUFNSSxVQUFVSixRQUFTLFNBQVQsQ0FBaEI7O0FBRUEsSUFBTUssaUJBQWlCLFVBQXZCO0FBQ0EsSUFBTUMsZUFBZSxRQUFyQjs7QUFFQSxJQUFNQyxXQUFXLFNBQVNBLFFBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCO0FBQzNDOzs7Ozs7Ozs7OztBQVdBLEtBQUlKLFFBQVNJLE1BQVQsRUFBaUJDLE1BQWpCLENBQUosRUFBK0I7QUFDOUJELFdBQVNBLE9BQU9FLFdBQWhCO0FBQ0E7O0FBRUQsS0FBSSxDQUFDTixRQUFTSSxNQUFULEVBQWlCRyxRQUFqQixDQUFMLEVBQWtDO0FBQ2pDLFFBQU0sSUFBSUMsS0FBSixDQUFXLGdCQUFYLENBQU47QUFDQTs7QUFFRCxLQUFJQyxPQUFPWixNQUFPTyxNQUFQLENBQVg7QUFDQSxLQUFJTSxZQUFZTixPQUFPTSxTQUF2Qjs7QUFFQTs7Ozs7O0FBTUEsS0FBSWYsTUFBT2MsSUFBUCxLQUFpQmQsTUFBT2UsU0FBUCxDQUFqQjtBQUNIRCxVQUFTUixjQUROLElBQ3dCUSxTQUFTUCxZQURyQztBQUVBO0FBQ0MsU0FBTyxFQUFQO0FBQ0E7O0FBRUQsS0FBSVMsUUFBUWIsTUFBT1csSUFBUCxFQUFhQyxTQUFiLEVBQXdCLENBQUVBLFNBQUYsQ0FBeEIsQ0FBWjs7QUFFQSxRQUFPQSxZQUFZLDhCQUF1QkEsU0FBdkIsQ0FBbkIsRUFBdUQ7QUFDdERELFNBQU9aLE1BQU9hLFVBQVVKLFdBQWpCLENBQVA7O0FBRUE7Ozs7OztBQU1BLE1BQUlYLE1BQU9jLElBQVAsS0FBaUJBLFNBQVNSLGNBQTFCLElBQTRDUSxTQUFTUCxZQUF6RCxFQUF1RTtBQUN0RTtBQUNBOztBQUVELE1BQUksQ0FBQ0gsS0FBTVUsSUFBTixFQUFZRSxLQUFaLENBQUwsRUFBMEI7QUFDekJBLFNBQU1DLElBQU4sQ0FBWUYsU0FBWjtBQUNBWixTQUFPVyxJQUFQLEVBQWFDLFNBQWIsRUFBd0JDLEtBQXhCO0FBQ0E7QUFDRDs7QUFFRCxRQUFPQSxLQUFQO0FBQ0EsQ0F6REQ7O0FBMkRBRSxPQUFPQyxPQUFQLEdBQWlCWCxRQUFqQiIsImZpbGUiOiJwcm90ZWFzZS5zdXBwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKjtcclxuXHRAbW9kdWxlLWxpY2Vuc2U6XHJcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcclxuXHRcdEBtaXQtbGljZW5zZVxyXG5cclxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3JcclxuXHRcdEBlbWFpbDogcmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVxyXG5cclxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuXHRcdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuXHRcdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblx0XHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5cdFx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuXHRcdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5cdFx0U09GVFdBUkUuXHJcblx0QGVuZC1tb2R1bGUtbGljZW5zZVxyXG5cclxuXHRAbW9kdWxlLWNvbmZpZ3VyYXRpb246XHJcblx0XHR7XHJcblx0XHRcdFwicGFja2FnZVwiOiBcInByb3RlYXNlXCIsXHJcblx0XHRcdFwicGF0aFwiOiBcInByb3RlYXNlL3Byb3RlYXNlLmpzXCIsXHJcblx0XHRcdFwiZmlsZVwiOiBcInByb3RlYXNlLmpzXCIsXHJcblx0XHRcdFwibW9kdWxlXCI6IFwicHJvdGVhc2VcIixcclxuXHRcdFx0XCJhdXRob3JcIjogXCJSaWNoZXZlIFMuIEJlYmVkb3JcIixcclxuXHRcdFx0XCJjb250cmlidXRvcnNcIjogW1xyXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiXHJcblx0XHRcdF0sXHJcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXHJcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9wcm90ZWFzZS5naXRcIixcclxuXHRcdFx0XCJ0ZXN0XCI6IFwicHJvdGVhc2UtdGVzdC5qc1wiLFxyXG5cdFx0XHRcImdsb2JhbFwiOiB0cnVlXHJcblx0XHR9XHJcblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxyXG5cclxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XHJcblx0XHRQcm90b3R5cGUgY2hhaW4gd2l0aCBsb29rdXAuXHJcblxyXG5cdFx0VGhpcyB3aWxsIGRpc3JlZ2FyZCB0aGUgcm9vdCBjaGFpbiBGdW5jdGlvbiBhbmQgT2JqZWN0IGNsYXNzIHByb3RvdHlwZSBzaW5jZVxyXG5cdFx0XHR3ZSBkb24ndCB3YW50IHRvIG1lc3Mgd2l0aCB0aG9zZS5cclxuXHRAZW5kLW1vZHVsZS1kb2N1bWVudGF0aW9uXHJcblxyXG5cdEBpbmNsdWRlOlxyXG5cdFx0e1xyXG5cdFx0XHRcImZhbHp5XCI6IFwiZmFsenlcIixcclxuXHRcdFx0XCJmbmFtZVwiOiBcImZuYW1lXCIsXHJcblx0XHRcdFwiaW1wZWxcIjogXCJpbXBlbFwiLFxyXG5cdFx0XHRcImtlaW5cIjogXCJrZWluXCIsXHJcblx0XHRcdFwicHJvdHlwZVwiOiBcInByb3R5cGVcIlxyXG5cdFx0fVxyXG5cdEBlbmQtaW5jbHVkZVxyXG4qL1xyXG5cclxuY29uc3QgZmFsenkgPSByZXF1aXJlKCBcImZhbHp5XCIgKTtcclxuY29uc3QgZm5hbWUgPSByZXF1aXJlKCBcImZuYW1lXCIgKTtcclxuY29uc3QgaW1wZWwgPSByZXF1aXJlKCBcImltcGVsXCIgKTtcclxuY29uc3Qga2VpbiA9IHJlcXVpcmUoIFwia2VpblwiICk7XHJcbmNvbnN0IHByb3R5cGUgPSByZXF1aXJlKCBcInByb3R5cGVcIiApO1xyXG5cclxuY29uc3QgRlVOQ1RJT05fQ0xBU1MgPSBcIkZ1bmN0aW9uXCI7XHJcbmNvbnN0IE9CSkVDVF9DTEFTUyA9IFwiT2JqZWN0XCI7XHJcblxyXG5jb25zdCBwcm90ZWFzZSA9IGZ1bmN0aW9uIHByb3RlYXNlKCBlbnRpdHkgKXtcclxuXHQvKjtcclxuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XHJcblx0XHRcdHtcclxuXHRcdFx0XHRcImVudGl0eTpyZXF1aXJlZFwiOiBbXHJcblx0XHRcdFx0XHRcIm9iamVjdFwiLFxyXG5cdFx0XHRcdFx0XCJmdW5jdGlvblwiXHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxyXG5cdCovXHJcblxyXG5cdGlmKCBwcm90eXBlKCBlbnRpdHksIE9CSkVDVCApICl7XHJcblx0XHRlbnRpdHkgPSBlbnRpdHkuY29uc3RydWN0b3I7XHJcblx0fVxyXG5cclxuXHRpZiggIXByb3R5cGUoIGVudGl0eSwgRlVOQ1RJT04gKSApe1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgZW50aXR5XCIgKTtcclxuXHR9XHJcblxyXG5cdGxldCBuYW1lID0gZm5hbWUoIGVudGl0eSApO1xyXG5cdGxldCBwcm90b3R5cGUgPSBlbnRpdHkucHJvdG90eXBlO1xyXG5cclxuXHQvKjtcclxuXHRcdEBub3RlOlxyXG5cdFx0XHRQb3NzaWJpbGl0eSB0aGF0IHRoZSBlbnRpdHkgaXMgYW5vbnltb3VzIHRoZXJlZm9yZSB0aGUgcHJvdG90eXBlIGNoYWluXHJcblx0XHRcdFx0d291bGQgYmUgZnVuY3Rpb24gYW5kIG9iamVjdCBzbyB0aGVyZSdzIG5vIG5lZWQgdG8gZXZhbHVhdGUuXHJcblx0XHRAZW5kLW5vdGVcclxuXHQqL1xyXG5cdGlmKCBmYWx6eSggbmFtZSApIHx8IGZhbHp5KCBwcm90b3R5cGUgKSB8fFxyXG5cdFx0bmFtZSA9PT0gRlVOQ1RJT05fQ0xBU1MgfHwgbmFtZSA9PT0gT0JKRUNUX0NMQVNTIClcclxuXHR7XHJcblx0XHRyZXR1cm4gWyBdO1xyXG5cdH1cclxuXHJcblx0bGV0IGNoYWluID0gaW1wZWwoIG5hbWUsIHByb3RvdHlwZSwgWyBwcm90b3R5cGUgXSApO1xyXG5cclxuXHR3aGlsZSggcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKCBwcm90b3R5cGUgKSApe1xyXG5cdFx0bmFtZSA9IGZuYW1lKCBwcm90b3R5cGUuY29uc3RydWN0b3IgKTtcclxuXHJcblx0XHQvKjtcclxuXHRcdFx0QG5vdGU6XHJcblx0XHRcdFx0RGlzY2FyZCByb290IG9mIHRoZSBjaGFpbi5cclxuXHRcdFx0XHRUaGUgcm9vdCBvZiB0aGUgY2hhaW4gY2FuIGJlIHRoZSBGdW5jdGlvbiBvciBPYmplY3QgY2xhc3MuXHJcblx0XHRcdEBlbmQtbm90ZVxyXG5cdFx0Ki9cclxuXHRcdGlmKCBmYWx6eSggbmFtZSApIHx8IG5hbWUgPT09IEZVTkNUSU9OX0NMQVNTIHx8IG5hbWUgPT09IE9CSkVDVF9DTEFTUyApe1xyXG5cdFx0XHRjb250aW51ZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiggIWtlaW4oIG5hbWUsIGNoYWluICkgKXtcclxuXHRcdFx0Y2hhaW4ucHVzaCggcHJvdG90eXBlICk7XHJcblx0XHRcdGltcGVsKCBuYW1lLCBwcm90b3R5cGUsIGNoYWluICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gY2hhaW47XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHByb3RlYXNlO1xyXG4iXX0=
//# sourceMappingURL=protease.support.js.map
