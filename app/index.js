import React, {Component} from 'react';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
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
  _onPressButton () {
    console.log('onpress');
  }
  render() {
    return (
      <View style={{marginLeft: 20}}>
        <Text>Just for fun</Text>
          <Button
            type="surface"
            size="small"
            theme="orange"
            loadingTitle="正在加载"
            isLoading={true}
            onPress={this._onPressButton}>Small</Button>
          <Button
            selfStyle={{marginTop: 50}}
            type="ghost"
            theme="blue"
            isLoading={true}
            onPress={this._onPressButton}>Default</Button>
          <Button
            selfStyle={{marginTop: 100}}
            size="large"
            theme="red"
            onPress={this._onPressButton}>Large</Button>
             <Button
            selfStyle={{marginTop: 160}}
            theme="gray"
            onPress={this._onPressButton}>Default</Button>
             <Button
            selfStyle={{marginTop: 220}}
            theme="#BA55D3"
            loadingTitle="正在加载"
            isLoading={true}
            onPress={this._onPressButton}>Default</Button>
            <Button
            selfStyle={{marginTop: 280}}
            theme="rgba(238,106,167,0.8)"
            onPress={this._onPressButton}><Text style={{marginRight: 20}}>test</Text>test</Button>
             <Button
            selfStyle={{marginTop: 340}}
            theme="#00C5CD"
            onPress={this._onPressButton}>default</Button>
      </View>
      );
  }
}

export default button;
