import React, {Component} from 'react';
import {
  Text,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
  View
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

  _renderChildren(size, color) {
    const {
      children = '',
      isLoading = false,
      loadingTitle = 'Loading'
    } = this.props;
    let childrenNode = [];
    if (isLoading) {
      let loadingSize = size;
      if (loadingSize === 'default') {loadingSize = 'small';}
      return <View style={[{'flexDirection': 'row'}, this.props.innerStyle]}><ActivityIndicator
                animating={true}
                color={color.themeColor}
                size={loadingSize}/><Text style={[color.textColor, {marginLeft: 5}]}>{loadingTitle}</Text></View>;
    } else {
      React.Children.forEach(children, function (item) {
        if (React.isValidElement(item)) {
          childrenNode.push(item);
        } else if (typeof item === 'string' || item === 'number') {
          const node = (<Text
                  style={[ButtonType[size], color.textColor]}
                  key={item}>
                  {item}
              </Text>);
          childrenNode.push(node);
        }
      });
      return <View style={[{'flexDirection': 'row'}, this.props.innerStyle]}>{childrenNode}</View>;
    }
  }

  render() {
    const {
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
               (disabled || isLoading) && colorConfig.disableColorCSS]}
        underlayColor={colorConfig.activeColor}
        {...this.props}
        disabled={disabled || isLoading}
        >
        {this._renderChildren(size, colorConfig)}
      </TouchableHighlight>
    );
  }
}

Button.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
  theme: React.PropTypes.string.isRequired,
  size: React.PropTypes.oneOf(['default', 'small', 'large']),
  type: React.PropTypes.oneOf(['ghost', 'surface'])
};

export default Button;
