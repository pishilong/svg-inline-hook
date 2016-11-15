'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compile = function compile(filename) {
  var result = void 0;

  var content = _fs2.default.readFileSync(filename, 'utf-8');

  result.code = 'module.exports = ' + JSON.stringify(content);

  return result.code;
};

var loader = function loader(filename) {
  return module._compile(compile(filename), filename);
};

var addHook = function addHook() {
  require.extensions['.svg'] = function (module, filename) {
    loader(module, filename);
  };
};

addHook();