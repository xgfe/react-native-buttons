/**
 * Created by yuebin on 16/6/2.
 */

var fs = require('fs');
var babel = require('babel-core');
var origJs = require.extensions['.js'];
require.extensions['.js'] = function (module, fileName) {
  var output;
  var src;

  if (fileName.indexOf('node_modules/') >= 0
    && (fileName.indexOf('node_modules/react-native-') === -1
    || fileName.indexOf('react-native-mock') >= 0)) {
    return (origJs || require.extensions['.js'])(module, fileName);
  }

  src = fs.readFileSync(fileName, 'utf8');
  output = babel.transform(src, {
    filename: fileName
  }).code;

  return module._compile(output, fileName);
};
