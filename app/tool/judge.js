import {Platform} from 'react-native';

export function judgePlatformLevel(module) {
  const level = Platform.Version;
  switch (module) {
    case 'TouchableNativeFeedback':
      return level >= 21;
    default:
      return true;
  }
}
