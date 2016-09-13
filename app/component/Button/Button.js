import React, {Component} from 'react';
import {
  Text,
  TouchableHighlight
} from 'react-native';
import {
  ButtonType,
  ButtonOuter,
  BasicColor
} from './ButtonStyle';
import {UnderlayColor} from './ButtonInfo';

import {Color, RGB, HSL} from 'tool';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderChildren = this._renderChildren.bind(this);
  }

  _renderChildren(size, textColor) {
    const {
      children = ''
    } = this.props;
    if (React.isValidElement(children)) {
      return children;
    }
    if (typeof children === 'string') {
      return <Text
                style={[ButtonType[size], textColor]}>
                {children}
             </Text>;
    }
  }

  render() {
    const {
      children = '',
      theme = 'default',
      type = 'surface',
      size = 'default',
      disabled = false
    } = this.props;
    let colorConfig = new BasicColor(theme, type);
    console.log(colorConfig.disableColorCSS);
    return (
      <TouchableHighlight
        style={[this.props.selfStyle,
               ButtonOuter.btn, ButtonOuter[size],
               colorConfig.themeColor,
               disabled && colorConfig.disableColorCSS]}
        underlayColor={colorConfig.activeColor}
        {...this.props}
        >
        {this._renderChildren(size, colorConfig.textColor)}
      </TouchableHighlight>
    );
  }
}

export default Button;
