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
            size="small"
            color="#EE3B3B">Small</Button>
      </View>
      );
  }
}

export default button;
