import React, {Component} from 'react';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {
  View,
  Text
} from 'react-native';
import {Button} from 'component';

// data
var timerData = observable({
  secondsPassed: 0
});

setInterval(() => {
  timerData.secondsPassed++;
}, 100);

class button extends Component {
  render() {
    return (
      <View style={{marginLeft: 20}}>
        <Text>Just for fun</Text>
          <Button
            type="surface"
            size="small"
            theme="#EE3B3B">Small</Button>
          <Button
            style={{marginTop: 50}}
            type="ghost"
            theme="default">Default</Button>
          <Button
            style={{marginTop: 100}}
            size="large"
            theme="orange">Large</Button>
      </View>
      );
  }
}

export default button;
