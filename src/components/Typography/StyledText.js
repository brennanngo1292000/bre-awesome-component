import React from "react";
import { Text, StyleSheet } from "react-native";
import { withTheme } from "../../";
import { Theme } from "../../types/Theme";
import PropTypes from "prop-types";

const trackingToSpacing = (fontSize, tracking) => (fontSize * tracking) / 1000;

const resolveFontSizeFromStyle = (style) => {
  if (!style) {
    return 0;
  }
  if (Array.isArray(style)) {
    return style.reduce(
      (acc, elem) => resolveFontSizeFromStyle(elem) || acc,
      0
    );
  }

  const realStyle =
    typeof style === "number" ? StyleSheet.flatten(style) : style;

  return realStyle ? realStyle.fontSize : null;
};

const StyledText = (props) => {
  const { style, children, config, theme, ...rest } = props;
  const fontSize = resolveFontSizeFromStyle(style) || config.fontSize;
  const letterSpacing = trackingToSpacing(fontSize, config.tracking);

  const calculatedStyle = {
    fontSize,
    fontWeight: config.fontWeight,
    letterSpacing,
    lineHeight: config.leading,
    color: theme.textColor,
  };
  return (
    <Text style={[calculatedStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

StyledText.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.element,
  ]),
  config: PropTypes.shape({
    fontSize: PropTypes.number,
    tracking: PropTypes.number,
    leading: PropTypes.number,
    fontWeight: PropTypes.string,
  }),
  theme: PropTypes.shape(Theme),
};

export default withTheme(StyledText);
