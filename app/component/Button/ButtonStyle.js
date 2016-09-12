import StyleSheet from 'react-native-stylesheet-xg';
import {BackgroundColors, FontColors, FontSize} from './ButtonInfo';
import {Color, RGB, HSL} from 'tool';

// set The style base
StyleSheet.setBase(360);


export function getBasicColor(theme, type, flag) {
  if (theme === 'default') {
    theme = 'blue';
  }
  let themeMap = ['orange', 'blue', 'red', 'gray'];
  let themeColor;
  if (themeMap.indexOf(theme) === -1) {
    let newColor = HSL.rgbToHsl(Color.format(theme));
    let newColorDisable = newColor.lighten(0.3);
    let newColorActive = newColor.darken(0.3);
    themeColor = 'hsla(' + newColor.h + ', ' + newColor.s + '%, ' + newColor.l + '%, ' + newColor.a + ')';
  } else {
    themeColor = BackgroundColors[theme];
  } 
  let ButtonThemeType;
  console.log(themeColor);
  switch (type) {
    case 'surface':
      ButtonThemeType = StyleSheet.create({
        theme: {
          backgroundColor: themeColor,
          borderColor: themeColor
        },
        text: {
          color: FontColors.fontWhite
        }
      });
      if (flag) {
        return ButtonThemeType.theme;
      }
      return ButtonThemeType.text;
    default:
      ButtonThemeType = StyleSheet.create({
        theme: {
          borderColor: themeColor
        },
        text: {
          color: themeColor
        }
      });
      if (flag) {
        return ButtonThemeType.theme;
      }
      return ButtonThemeType.text;
  }
}

export let ButtonDisableStyle = StyleSheet.create({
  default: {
    backgroundColor: BackgroundColors.blueDisable
  },
  orange: {
    backgroundColor: BackgroundColors.orangeDisable
  },
  red: {
    backgroundColor: BackgroundColors.redDisable
  },
  gray: {
    backgroundColor: BackgroundColors.grayDisable
  }
});

export let ButtonActiveStyle = StyleSheet.create({
  default: {
    backgroundColor: BackgroundColors.blueActive
  },
  orange: {
    backgroundColor: BackgroundColors.orangeActive
  },
  red: {
    backgroundColor: BackgroundColors.redActive
  },
  gray: {
    backgroundColor: BackgroundColors.grayActive
  }
});

export let ButtonType = StyleSheet.create({
  default: {
    fontSize: FontSize.fontlevel1
  },
  small: {
    fontSize: FontSize.fontlevel1
  },
  large: {
    fontSize: FontSize.fontlevel2
  }
});

export let ButtonOuter = StyleSheet.create({
  btn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  small: {
    borderRadius: 3,
    borderWidth: 1,
    height: 25,
    paddingRight: 12,
    paddingLeft: 12
  },
  default: {
    borderRadius: 3,
    borderWidth: 1,
    height: 30,
    paddingRight: 12,
    paddingLeft: 12
  },
  large: {
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    paddingRight: 20,
    paddingLeft: 20
  }
});
