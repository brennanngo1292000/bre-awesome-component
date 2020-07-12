import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types";
import { Theme } from "../../types/Theme";
import { withTheme } from "../../core/theming";

const Button = (props) => {
  const {
    color,
    disabled,
    inline,
    centered,
    rounded,
    inverted,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    theme,
    style,
    innerStyle,
    disabledStyle,
    children,
    testID,
  } = props;

  const _getStyles = (theme) => {
    const { primaryColor, disabledColor } = theme;

    return {
      default: StyleSheet.create({
        inner: {
          textAlign: "left",
          fontWeight: "normal",
          fontSize: 17,
          color: primaryColor,
        },
      }),
      disabled: {
        inner: {
          color: disabledColor,
        },
      },
      centered: StyleSheet.create({
        inner: {
          textAlign: "center",
        },
      }),
      rounded: StyleSheet.create({
        inner: {
          fontSize: 14,
          textAlign: "center",
        },
        container: {
          borderWidth: 1,
          borderColor: primaryColor,
          borderRadius: 8,
          justifyContent: "center",
          padding: 10,
        },
      }),
      roundedDisabled: StyleSheet.create({
        container: {
          borderColor: disabledColor,
        },
      }),
      inverted: StyleSheet.create({
        inner: {
          color: "#ffffff",
        },
        container: {
          backgroundColor: primaryColor,
        },
      }),
      invertedDisabled: StyleSheet.create({
        container: {
          backgroundColor: disabledColor,
          borderColor: disabledColor,
        },
      }),
    };
  };

  const styles = _getStyles(theme);
  
  const _styleFromProps = () => {
    const styleFromProps = [];
    const appliedStyleProps = {
      centered,
      rounded,
      disabled,
      inverted,
    };

    Object.keys(appliedStyleProps).forEach((key) => {
      const value = appliedStyleProps[key];
      if (value) {
        styleFromProps[styleFromProps.length] = styles[key];
      }
    });

    if (disabled && rounded) {
      styleFromProps[styleFromProps.length] = inverted
        ? styles.invertedDisabled
        : styles.roundedDisabled;
    }

    if (color && !disabled) {
      styleFromProps[styleFromProps.length] = {
        inner: { color },
      };
    }

    return {
      inner: styleFromProps.map((style) => style.inner),
      container: styleFromProps.map((style) => style.container),
    };
  };

  const _renderButton = () => {
    const { inner, container } = _styleFromProps();
    const _renderChildren = () => {
      if (typeof children == "string") {
        return (
          <Text style={[styles.default.inner, ...inner, innerStyle]}>
            {children}
          </Text>
        );
      } else {
        return children;
      }
    };

    let wrapperStyle;
    if (inline) {
      wrapperStyle = {
        flexDirection: "row",
      };
      if (centered) {
        wrapperStyle.justifyContent = "center";
      }
    }

    return (
      <View style={wrapperStyle}>
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onLongPress={onLongPress}
          accessibilityRole="button"
          testID={testID}
          style={[styles.default.container, ...container, style, disabledStyle]}
        >
          {_renderChildren()}
        </TouchableOpacity>
      </View>
    );
  };

  return _renderButton();
};

Button.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  centered: PropTypes.bool,
  rounded: PropTypes.bool,
  inverted: PropTypes.bool,
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  onLongPress: PropTypes.func,
  theme: PropTypes.shape(Theme),
  style: ViewPropTypes.style,
  innerStyle: ViewPropTypes.style,
  disabledStyle: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.element,
  ]),
  testID: PropTypes.string,
};

export default withTheme(Button);
