import {jsdom} from 'jsdom';
global.document = jsdom('');
global.window = document.defaultView;
import React, {Component, propTypes} from 'react';
import {
  Platform,
  View,
  Text
} from 'react-native';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import button from '../app/component/Button/Button';

describe('test test', () => {
  it('check the test', () => {
    let y = 1;
    expect(y).to.equal(1);
  });
})
