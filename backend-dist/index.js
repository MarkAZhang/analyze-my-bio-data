'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var PATH_DIST = _path2.default.resolve(__dirname, '../static');
app.use('/static', _express2.default.static(PATH_DIST));

app.get('/*', function (req, res) {
  res.sendFile(_path2.default.resolve(__dirname, '../index.html'));
});

if (process.env.NODE_ENV === 'production') {
  console.log('Listening at port 80!');
  app.listen(80);
} else {
  console.log('Listening at port 8888!');
  app.listen(8888);
}