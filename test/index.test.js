import {jsdom} from 'jsdom';
global.document = jsdom('');
global.window = document.defaultView;
import React, {Component, propTypes} from 'react';
import {
  Platform,
  View,
  Text,
  Image
} from 'react-native';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import button from '../app/component/index';

// hack require for require image
var m = require('module');
var originalLoader = m._load;

m._load = function (request, parent, isMain) {
  var file = m._resolveFilename(request, parent);
  if (file.match(/.jpeg|.jpg|.png$/)) {
    return {uri: file};
  }
  return originalLoader(request, parent, isMain);
};

describe('test test', () => {
  it('check the test', () => {
    let y = 1;
    expect(y).to.equal(1);
  });
})
