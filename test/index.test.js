import {jsdom} from 'jsdom';
global.document = jsdom('');
global.window = document.defaultView;
import React, {Component, propTypes} from 'react';
import {
  Platform,
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Button from '../app/component/Button/Button';

describe('TEST PROPS', () => {
  it('check the props', () => {
    const wrapper = shallow(<Button type="surface" size="small" theme="orange">test</Button>);
    expect(wrapper.props().type).to.equal('surface');
    expect(wrapper.props().size).to.equal('small');
    expect(wrapper.props().theme).to.equal('orange');
  });

  it('check loading', () => {
    const wrapper1 = shallow(
      <Button
        type="surface"
        size="default"
        theme="orange"
        isLoading={true}
        loadingTitle="正在加载"
        disableColor="#00C5CD"
        loadingColor="rgba(221,106,167,0.8)">test</Button>
      );
    expect(wrapper1.props().loadingTitle).to.equal('正在加载');
    expect(wrapper1.props().isLoading).to.equal(true);
    expect(wrapper1.find(ActivityIndicator).props().size).to.equal('small');
  });

  it('check active', () => {
    Platform.Version = 20;
    const wrapper2 = shallow(
       <Button
          selfStyle={{marginTop: 450}}
          theme="blue"
          size="default"
          active={true}
          onPress={this._onPressButton}>default</Button>
    );
    expect(wrapper2.find(TouchableHighlight).props().disabled).to.equal(false);
    expect(wrapper2.find(TouchableNativeFeedback)).to.have.length(0);
  });

  it('check platform', () => {
    Platform.Version = 23;
    TouchableNativeFeedback.Ripple = function(){};
    const wrapper3 = shallow(
       <Button
          selfStyle={{marginTop: 450}}
          type="ghost"
          theme="#BA55D3"
          size="default"
          active={true}
          onPress={this._onPressButton}>default</Button>
    );
    expect(wrapper3.find(TouchableHighlight)).to.have.length(0);
    expect(wrapper3.find(TouchableNativeFeedback)).to.have.length(1);
  });
});
