import React, {Component} from 'react';
import {
  Text,
  TouchableHighlight,
  ActivityIndicator
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
      children = '',
      isLoading = false
    } = this.props;
    if (React.isValidElement(children)) {
      return children;
    }
    if (typeof children === 'string') {
      if (isLoading) {
        let loadingSize = size;
        if (loadingSize === 'default') {loadingSize = 'small';}
        return <ActivityIndicator
               animating={true}
               size={loadingSize}>
               </ActivityIndicator>
      } else {
        return <Text
                style={[ButtonType[size], textColor]}>
                {children}
             </Text>;
      }
    }
  }

  render() {
    const {
      children = '',
      theme = 'default',
      type = 'surface',
      size = 'default',
      disabled = false,
      isLoading = false
    } = this.props;
    let colorConfig = new BasicColor(theme, type);
    return (
      <TouchableHighlight
        style={[ButtonOuter.btn,
               ButtonOuter[size],
               colorConfig.themeColor,
               this.props.selfStyle,
               disabled && colorConfig.disableColorCSS]}
        underlayColor={colorConfig.activeColor}
        {...this.props}
        disabled={disabled || isLoading}
        >
        {this._renderChildren(size, colorConfig.textColor)}
      </TouchableHighlight>
    );
  }
}

Button.propTypes = {
  children: React.PropTypes.oneOfType([React.PropTypes.string.isRequired, React.PropTypes.object.isRequired]),
  onPress: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
  theme: React.PropTypes.string.isRequired,
  size: React.PropTypes.oneOf(['default', 'small', 'large']),
  type: React.PropTypes.oneOf(['ghost', 'surface'])
};

export default Button;
