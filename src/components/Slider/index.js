import React from "react";
import { Slider, View, StyleSheet } from "react-native";
import { Theme } from "../../types/Theme";
import { withTheme } from "../../core/theming";
import Icon from "../Icon";
import PropTypes from "prop-types";

const SliderC = (props) => {
  const {
    value,
    minValue,
    maxValue,
    stepValue,
    minIconName,
    maxIconName,
    minIconColor,
    maxIconColor,
    minIconSize,
    maxIconSize,
    theme,
    style,
    onValueChange,
    minTrackTintColor,
    maxTrackTintColor,
    ...rest
  } = props;
  return (
    <View style={[styles.container, style]}>
      {minIconName && (
        <Icon
          style={styles.icon}
          name={minIconName}
          size={minIconSize}
          color={minIconColor || theme.placeholderColor}
        />
      )}
      <Slider
        style={styles.slider}
        value={value}
        minimumValue={minValue}
        maximumValue={maxValue}
        step={stepValue}
        onValueChange={onValueChange}
        minimumTrackTintColor={minTrackTintColor || theme.primaryColor}
        maximumTrackTintColor={maxTrackTintColor || theme.dividerColor}
        {...rest}
      />
      {maxIconName && (
        <Icon
          style={styles.icon}
          name={maxIconName}
          size={maxIconSize}
          color={maxIconColor || theme.placeholderColor}
        />
      )}
    </View>
  );
};

SliderC.propTypes = {
  value: PropTypes.number,
  stepValue: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  minIconName: PropTypes.string,
  maxIconName: PropTypes.string,
  minIconColor: PropTypes.string,
  maxIconColor: PropTypes.string,
  minIconSize: PropTypes.number,
  maxIconSize: PropTypes.number,
  style: PropTypes.any,
  theme: PropTypes.shape(Theme),
  onValueChange: PropTypes.func,
  onSlidingComplete: PropTypes.func,
  minTrackTintColor: PropTypes.string,
  maxTrackTintColor: PropTypes.string,
};

SliderC.defaultProps = {
  minValue: 0,
  maxValue: 100,
  stepValue: 1,
  minIconSize: 28,
  maxIconSize: 35,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  slider: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    marginTop: 2,
  },
});

export default withTheme(SliderC);
