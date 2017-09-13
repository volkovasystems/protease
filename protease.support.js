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
              			"kein": "kein"
              		}
              	@end-include
              */var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _typeof2 = require("babel-runtime/helpers/typeof");var _typeof3 = _interopRequireDefault(_typeof2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var falzy = require("falzy");
var fname = require("fname");
var impel = require("impel");
var kein = require("kein");

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

	if ((typeof entity === "undefined" ? "undefined" : (0, _typeof3.default)(entity)) == "object") {
		entity = entity.constructor;
	}

	if (typeof entity != "function") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb3RlYXNlLnN1cHBvcnQuanMiXSwibmFtZXMiOlsiZmFsenkiLCJyZXF1aXJlIiwiZm5hbWUiLCJpbXBlbCIsImtlaW4iLCJGVU5DVElPTl9DTEFTUyIsIk9CSkVDVF9DTEFTUyIsInByb3RlYXNlIiwiZW50aXR5IiwiY29uc3RydWN0b3IiLCJFcnJvciIsIm5hbWUiLCJwcm90b3R5cGUiLCJjaGFpbiIsInB1c2giLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZEQSxJQUFNQSxRQUFRQyxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1DLFFBQVFELFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUUsUUFBUUYsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNRyxPQUFPSCxRQUFTLE1BQVQsQ0FBYjs7QUFFQSxJQUFNSSxpQkFBaUIsVUFBdkI7QUFDQSxJQUFNQyxlQUFlLFFBQXJCOztBQUVBLElBQU1DLFdBQVcsU0FBU0EsUUFBVCxDQUFtQkMsTUFBbkIsRUFBMkI7QUFDM0M7Ozs7Ozs7Ozs7O0FBV0EsS0FBSSxRQUFPQSxNQUFQLHVEQUFPQSxNQUFQLE1BQWlCLFFBQXJCLEVBQStCO0FBQzlCQSxXQUFTQSxPQUFPQyxXQUFoQjtBQUNBOztBQUVELEtBQUksT0FBT0QsTUFBUCxJQUFpQixVQUFyQixFQUFpQztBQUNoQyxRQUFNLElBQUlFLEtBQUosQ0FBVyxnQkFBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBSUMsT0FBT1QsTUFBT00sTUFBUCxDQUFYO0FBQ0EsS0FBSUksWUFBWUosT0FBT0ksU0FBdkI7O0FBRUE7Ozs7OztBQU1BLEtBQUlaLE1BQU9XLElBQVAsS0FBaUJYLE1BQU9ZLFNBQVAsQ0FBakI7QUFDSEQsVUFBU04sY0FETixJQUN3Qk0sU0FBU0wsWUFEckM7QUFFQTtBQUNDLFNBQU8sRUFBUDtBQUNBOztBQUVELEtBQUlPLFFBQVFWLE1BQU9RLElBQVAsRUFBYUMsU0FBYixFQUF3QixDQUFFQSxTQUFGLENBQXhCLENBQVo7O0FBRUEsUUFBT0EsWUFBWSw4QkFBdUJBLFNBQXZCLENBQW5CLEVBQXVEO0FBQ3RERCxTQUFPVCxNQUFPVSxVQUFVSCxXQUFqQixDQUFQOztBQUVBOzs7Ozs7QUFNQSxNQUFJVCxNQUFPVyxJQUFQLEtBQWlCQSxTQUFTTixjQUExQixJQUE0Q00sU0FBU0wsWUFBekQsRUFBdUU7QUFDdEU7QUFDQTs7QUFFRCxNQUFJLENBQUNGLEtBQU1PLElBQU4sRUFBWUUsS0FBWixDQUFMLEVBQTBCO0FBQ3pCQSxTQUFNQyxJQUFOLENBQVlGLFNBQVo7QUFDQVQsU0FBT1EsSUFBUCxFQUFhQyxTQUFiLEVBQXdCQyxLQUF4QjtBQUNBO0FBQ0Q7O0FBRUQsUUFBT0EsS0FBUDtBQUNBLENBekREOztBQTJEQUUsT0FBT0MsT0FBUCxHQUFpQlQsUUFBakIiLCJmaWxlIjoicHJvdGVhc2Uuc3VwcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKjtcblx0QG1vZHVsZS1saWNlbnNlOlxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXHRcdEBtaXQtbGljZW5zZVxuXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNyBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxuXHRcdEBlbWFpbDogcmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVxuXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuXHRcdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcblx0XHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuXHRcdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuXHRcdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0XHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcblx0XHRjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRcdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuXHRcdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0XHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5cdFx0U09GVFdBUkUuXG5cdEBlbmQtbW9kdWxlLWxpY2Vuc2VcblxuXHRAbW9kdWxlLWNvbmZpZ3VyYXRpb246XG5cdFx0e1xuXHRcdFx0XCJwYWNrYWdlXCI6IFwicHJvdGVhc2VcIixcblx0XHRcdFwicGF0aFwiOiBcInByb3RlYXNlL3Byb3RlYXNlLmpzXCIsXG5cdFx0XHRcImZpbGVcIjogXCJwcm90ZWFzZS5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJwcm90ZWFzZVwiLFxuXHRcdFx0XCJhdXRob3JcIjogXCJSaWNoZXZlIFMuIEJlYmVkb3JcIixcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcblx0XHRcdFx0XCJKb2huIExlbm9uIE1hZ2hhbm95IDxqb2hubGVub25tYWdoYW5veUBnbWFpbC5jb20+XCJcblx0XHRcdF0sXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL3Byb3RlYXNlLmdpdFwiLFxuXHRcdFx0XCJ0ZXN0XCI6IFwicHJvdGVhc2UtdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRQcm90b3R5cGUgY2hhaW4gd2l0aCBsb29rdXAuXG5cblx0XHRUaGlzIHdpbGwgZGlzcmVnYXJkIHRoZSByb290IGNoYWluIEZ1bmN0aW9uIGFuZCBPYmplY3QgY2xhc3MgcHJvdG90eXBlIHNpbmNlXG5cdFx0XHR3ZSBkb24ndCB3YW50IHRvIG1lc3Mgd2l0aCB0aG9zZS5cblx0QGVuZC1tb2R1bGUtZG9jdW1lbnRhdGlvblxuXG5cdEBpbmNsdWRlOlxuXHRcdHtcblx0XHRcdFwiZmFsenlcIjogXCJmYWx6eVwiLFxuXHRcdFx0XCJmbmFtZVwiOiBcImZuYW1lXCIsXG5cdFx0XHRcImltcGVsXCI6IFwiaW1wZWxcIixcblx0XHRcdFwia2VpblwiOiBcImtlaW5cIlxuXHRcdH1cblx0QGVuZC1pbmNsdWRlXG4qL1xuXG5jb25zdCBmYWx6eSA9IHJlcXVpcmUoIFwiZmFsenlcIiApO1xuY29uc3QgZm5hbWUgPSByZXF1aXJlKCBcImZuYW1lXCIgKTtcbmNvbnN0IGltcGVsID0gcmVxdWlyZSggXCJpbXBlbFwiICk7XG5jb25zdCBrZWluID0gcmVxdWlyZSggXCJrZWluXCIgKTtcblxuY29uc3QgRlVOQ1RJT05fQ0xBU1MgPSBcIkZ1bmN0aW9uXCI7XG5jb25zdCBPQkpFQ1RfQ0xBU1MgPSBcIk9iamVjdFwiO1xuXG5jb25zdCBwcm90ZWFzZSA9IGZ1bmN0aW9uIHByb3RlYXNlKCBlbnRpdHkgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJlbnRpdHk6cmVxdWlyZWRcIjogW1xuXHRcdFx0XHRcdFwib2JqZWN0XCIsXG5cdFx0XHRcdFx0XCJmdW5jdGlvblwiXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGlmKCB0eXBlb2YgZW50aXR5ID09IFwib2JqZWN0XCIgKXtcblx0XHRlbnRpdHkgPSBlbnRpdHkuY29uc3RydWN0b3I7XG5cdH1cblxuXHRpZiggdHlwZW9mIGVudGl0eSAhPSBcImZ1bmN0aW9uXCIgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBlbnRpdHlcIiApO1xuXHR9XG5cblx0bGV0IG5hbWUgPSBmbmFtZSggZW50aXR5ICk7XG5cdGxldCBwcm90b3R5cGUgPSBlbnRpdHkucHJvdG90eXBlO1xuXG5cdC8qO1xuXHRcdEBub3RlOlxuXHRcdFx0UG9zc2liaWxpdHkgdGhhdCB0aGUgZW50aXR5IGlzIGFub255bW91cyB0aGVyZWZvcmUgdGhlIHByb3RvdHlwZSBjaGFpblxuXHRcdFx0XHR3b3VsZCBiZSBmdW5jdGlvbiBhbmQgb2JqZWN0IHNvIHRoZXJlJ3Mgbm8gbmVlZCB0byBldmFsdWF0ZS5cblx0XHRAZW5kLW5vdGVcblx0Ki9cblx0aWYoIGZhbHp5KCBuYW1lICkgfHwgZmFsenkoIHByb3RvdHlwZSApIHx8XG5cdFx0bmFtZSA9PT0gRlVOQ1RJT05fQ0xBU1MgfHwgbmFtZSA9PT0gT0JKRUNUX0NMQVNTIClcblx0e1xuXHRcdHJldHVybiBbIF07XG5cdH1cblxuXHRsZXQgY2hhaW4gPSBpbXBlbCggbmFtZSwgcHJvdG90eXBlLCBbIHByb3RvdHlwZSBdICk7XG5cblx0d2hpbGUoIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiggcHJvdG90eXBlICkgKXtcblx0XHRuYW1lID0gZm5hbWUoIHByb3RvdHlwZS5jb25zdHJ1Y3RvciApO1xuXG5cdFx0Lyo7XG5cdFx0XHRAbm90ZTpcblx0XHRcdFx0RGlzY2FyZCByb290IG9mIHRoZSBjaGFpbi5cblx0XHRcdFx0VGhlIHJvb3Qgb2YgdGhlIGNoYWluIGNhbiBiZSB0aGUgRnVuY3Rpb24gb3IgT2JqZWN0IGNsYXNzLlxuXHRcdFx0QGVuZC1ub3RlXG5cdFx0Ki9cblx0XHRpZiggZmFsenkoIG5hbWUgKSB8fCBuYW1lID09PSBGVU5DVElPTl9DTEFTUyB8fCBuYW1lID09PSBPQkpFQ1RfQ0xBU1MgKXtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmKCAha2VpbiggbmFtZSwgY2hhaW4gKSApe1xuXHRcdFx0Y2hhaW4ucHVzaCggcHJvdG90eXBlICk7XG5cdFx0XHRpbXBlbCggbmFtZSwgcHJvdG90eXBlLCBjaGFpbiApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjaGFpbjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcHJvdGVhc2U7XG4iXX0=
//# sourceMappingURL=protease.support.js.map
