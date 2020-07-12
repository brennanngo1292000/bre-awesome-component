import color from 'color';
import * as colors from './colors';

const DefaultTheme = {
  primaryColor: colors.blue,
  primaryLightColor: color(colors.blue).lighten(0.5).string(),
  disabledColor: color(colors.blue).lighten(0.8).string(),
  backgroundColor: colors.white,
  barColor: colors.greyL2,
  dividerColor: colors.grey,
  textColor: colors.black,
  placeholderColor: colors.greyD1,
  footnoteColor: colors.greyD1,
  footnoteBackgroundColor: colors.greyL1,
  positiveColor: colors.green,
};

export default DefaultTheme;