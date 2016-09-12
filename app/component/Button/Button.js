import React, {Component} from 'react';
import {
  Text,
  TouchableHighlight
} from 'react-native';
import {
  ButtonStyle,
  ButtonDisableStyle,
  ButtonActiveStyle,
  ButtonType,
  ButtonOuter,
  getBasicColor
} from './ButtonStyle';

import {Color, RGB, HSL} from 'tool';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderChildren = this._renderChildren.bind(this);
  }

  _renderChildren() {
    const {
      children = '',
      theme = 'default',
      type = 'surface',
      surface = 'default',
      size = 'default'
    } = this.props;
    if (React.isValidElement(children)) {
      return children;
    }
    if (typeof children === 'string') {
      return <Text
                style={[ButtonType[size], getBasicColor(theme, type, 0)]}>
                {children}
             </Text>;
    }
  }

  render() {
    const {
      children = '',
      theme = 'default',
      type = 'surface',
      size = 'default'
    } = this.props;
    return (
      <TouchableHighlight
        style={[this.props.style, ButtonOuter.btn, ButtonOuter[size], getBasicColor(theme, type, 1)]}
        >
        {this._renderChildren()}
      </TouchableHighlight>
    );
  }
}

export default Button;
