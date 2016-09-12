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
      type = 'default'
    } = this.props;
    if (React.isValidElement(children)) {
      return children;
    }
    if (typeof children === 'string') {
      return <Text 
                style={[ButtonType[type], getBasicColor(theme, type, 0)]}>
                {children}
             </Text>;
    }
  }

  render() {
    const {
      children = '',
      theme = 'default',
      type = 'default',
      size = 'default',
      color = ''
    } = this.props;
    if (color) {
      let newColor = HSL.rgbToHsl(Color.format(color));
    };
    let typepass;
    if (type.indexOf('surface') === -1) {
      typepass = 'surface' + type;
    } else {
      typepass = type;
    }
    return (
      <TouchableHighlight style={[this.props.style, ButtonOuter.btn, ButtonOuter[typepass], getBasicColor(theme, type, 1)]}>
        {this._renderChildren()}
      </TouchableHighlight>
    );
  }
}

export default Button;
