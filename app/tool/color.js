//检查颜色格式 -> 统一颜色格式 -> 明暗处理 -> 输出结果
//颜色格式: 3位Hex 6位Hex 整数RGB 百分百RGB 整数RGBA 百分比RGBA HSL HSLA
//十六进制转换十进制 parseInt 十进制转化十六进制 toString(16)
//具体在0-255之间留给js判断
//判断百分比的具体数值留给js

const hex3 = /^#([0-9a-fA-F]{3})$/;
const hex6 = /^#([0-9a-fA-F]{6})$/;
const rgbInt = /^rgb\(\s*(\d{0,3})\s*,\s*(\d{0,3})\s*,\s*(\d{0,3})\s*\)$/;
const rgbPercent = /^rgb\(\s*(\d+(?:\.?\d+)?)%\s*,\s*(\d+(?:\.?\d+)?)%\s*,\s*(\d+(?:\.?\d+)?)%\s*\)$/;
const rgbaInt = /^rgba\(\s*(\d{0,3})\s*,\s*(\d{0,3})\s*,\s*(\d{0,3})\s*,\s*(1|1\.0+|0\.\d+)\s*\)$/;
const rgbaPercent = 
      /^rgba\(\s*(\d+(?:\.?\d+)?)%\s*,\s*(\d+(?:\.?\d+)?)%\s*,\s*(\d+(?:\.?\d+)?)%\s*,\s*(\d+(?:\.?\d+)?)%\s*\)$/;
const hsl = /^hsl\(\s*(\d+(?:\.?\d+)?)\s*,\s*(\d+(?:\.?\d+)?)%\s*,\s*(\d+(?:\.?\d+)?)%\s*\)$/;
const hsla = /^hsla\(\s*(\d+(?:\.?\d+)?)\s*,\s*(\d+(?:\.?\d+)?)%\s*,\s*(\d+(?:\.?\d+)?)%\s*,\s*(1|1\.0+|0\.\d+)\s*\)$/;

export class Color {
  static format(color) {
    color = (color + '').trim().toLowerCase();
    if (hex3.exec(color)) {
      let tempColor = parseInt(hex3.exec(color)[1], 16);
      return RGB.hex3ToRgb(tempColor);
    }
    if (hex6.exec(color)) {
      let tempColor = parseInt(hex6.exec(color)[1], 16);
      return RGB.hex6ToRgb(tempColor);
    }
    if (rgbInt.exec(color)) {
      return RGB.rgbIntTo(color);
    }
    if (rgbPercent.exec(color)) {
      return RGB.rgbPercent(color);
    }
    if (rgbaInt.exec(color)) {
      return color;
    }
    if (rgbaPercent.exec(color)) {
      return RGB.rgbPercent(color);
    }
    if (hsl.exec(color)) {
      let hslValue = HSL.getValue(color);
      return hslValue;
    }
    if (hsla.exec(color)) {
      let hslValue = HSL.getValue(color);
      return hslValue;
    }
  }
}
export class RGB {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  static hex3ToRgb (color) {
    return new RGB((color >> 8 & 0xf) | (color >> 4 & 0x0f0),
                   (color >> 4 & 0xf) | (color & 0xf),
                   ((color & 0xf) << 4) | (color & 0xf),
                   1);
  }
  static hex6ToRgb (color) {
    return new RGB(color >> 16 & 0xff,
                   color >> 8 & 0xff,
                   color & 0xff,
                   1);
  }
  static rgbIntTo (color) {
    return new RGB(parseFloat(rgbaInt.exec(color)[1]),
                   parseFloat(rgbaInt.exec(color)[2]),
                   parseFloat(rgbaInt.exec(color)[3]),
                   1);
  }
  static rgbPercentTo (color) {
    return new RGB(255 * parseFloat(rgbPercent.exec(color)[1]) / 100,
                   255 * parseFloat(rgbPercent.exec(color)[2]) / 100,
                   255 * parseFloat(rgbPercent.exec(color)[3]) / 100,
                   parseFloat(rgbaPercent.exec(color)[4]) / 100 || 1);
  }
}
export class HSL {
  constructor(h, s, l, a) {
    this.h = h;
    this.s = s;
    this.l = l;
    this.a = a;
  }
  static getValue (color) {
    let h = hsl.exec(color)[1];
    let s = hsl.exec(color)[2] / 100;
    let l = hsl.exec(color)[3] / 100;
    let a = hsl.exec(color)[4] || 1;
    HSL.judgeType({h, s, l, a});
  }
  static judgeType (color) {
    let {h, s, l, a} = color;
    if (s === 0) {
      return new RGB(l, l, l, a);
    } else {
      let q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
      let p = 2 * l - q;
      h = h / 360;
      return new RGB(HSL.hslToRgb(p, q, h + 1 / 3),
                       HSL.hslToRgb(p, q, h),
                       HSL.hslToRgb(p, q, h - 1 / 3),
                       a);
    }
  }
  static hslToRgb (p, q, t) {
    if (t < 0) {t = t + 1;}
    if (t > 1) {t = t - 1;}
    if (t < 1 / 6) {
      return p + ((q - p) * 6 * t);
    } else if (t >= 1 / 6 && t < 1 / 2) {
      return q;
    } else if (t >= 1 / 2 && t < 2 / 3) {
      return p + ((q - p) * 6 * (2 / 3 - t));
    }
    return p;
  }
  static rgbToHsl (color) {
    let r = color.r / 255;
    let g = color.g / 255;
    let b = color.b / 255;
    let a = color.a || 1;
    let maxValue = Math.max(r, g, b);
    let minValue = Math.min(r, g, b);
    let h, s, l = 0.5 * (maxValue + minValue);
    let temp = maxValue - minValue;
    if (maxValue === minValue) {
      h = s = 0;
    } else {
      if (l === 0) {s = 0;} else {
        s = l > 0.5 ? temp / (2 - (maxValue + minValue)) : temp / (maxValue + minValue);
      }
      if (maxValue === r && g >= b) {
        h = 60 * (g - b) / temp;
      } else if (maxValue === r && g < b) {
        h = (60 * (g - b) / temp) + 360;
      } else if (maxValue === g) {
        h = (60 * (b - r) / temp) + 120;
      } else if (maxValue === b) {
        h = (60 * (r - g) / temp) + 240;
      }
      h = h % 360;
    }
    return new HSL(h, s * 100, l * 100, a);
  }
  darken (value) {
    this.l = this.l * (1 - value);
    return this;
  }
  lighten (value) {
    this.l = this.l * (1 + value);
    return this;
  }
}

export default Color;
