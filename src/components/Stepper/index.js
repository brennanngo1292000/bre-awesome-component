import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import Icon from '../Icon';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';

const Stepper = (props) => {
  const {
    value,
    minValue,
    maxValue,
    onValueChange,
    stepValue,
    theme: {primaryColor, primaryLightColor},
  } = props;

  if (value < minValue) {
    throw new Error('Value cannot be lower than minValue');
  }
  if (value > maxValue) {
    throw new Error('Value cannot be higher than maxValue');
  }
  if (minValue > maxValue) {
    throw new Error('minValue cannot be higher than maxValue');
  }

  let _interval;
  let _timeout;
  const isMinimum = value === minValue;
  const isMaximum = value === maxValue;
  const [isDecrementing, setIsDecrementing] = useState(false);
  const [isIncrementing, setIsIncrementingg] = useState(false);

  const _decrementOnCounter = () => {
    const newValue = value - stepValue;
    if (newValue >= minValue) {
      onValueChange(newValue);
    }
  };

  const _incrementOnCounter = () => {
    const newValue = value + stepValue;
    if (newValue <= maxValue) {
      onValueChange(newValue);
    }
  };

  const _handleIncrementPressIn = () => {
    _incrementOnCounter();
    _timeout = setTimeout(() => {
      _startInterval(this.incrementOnCounter);
      setIsIncrementingg(true);
    }, 500);
  };

  const _handleDecrementPressIn = () => {
    _decrementOnCounter();
    _timeout = setTimeout(() => {
      _startInterval(this.decrementOnCounter);
      setIsDecrementing(true);
    }, 500);
  };

  const _handlePressOut = () => {
    clearTimeout(_timeout);
    clearInterval(_interval);
    setIsDecrementing(false);
    setIsIncrementingg(false);
  };

  const _startInterval = (callback, speed = 300) => {
    let i = 0;
    _interval = setInterval(() => {
      callback();
      i += 1;
      if (i === 10) {
        clearInterval(_interval);
        _startInterval(callback, speed / 2);
      }
    }, speed);
  };

  useEffect(() => {
    return () => {
      clearTimeout(_timeout);
      clearInterval(_interval);
    };
  });

  return (
    <View style={[styles.container, {borderColor: primaryColor}]}>
      <TouchableWithoutFeedback
        onPressIn={_handleDecrementPressIn}
        onPressOut={_handlePressOut}
        disabled={isMinimum}>
        <View
          style={[
            {
              borderColor: primaryColor,
              backgroundColor:
                isMinimum || !isDecrementing
                  ? 'transparent'
                  : primaryLightColor,
            },
            styles.stepperIcon,
            styles.stepperMinus,
          ]}>
          <Icon
            name="md-remove"
            size={20}
            color={isMinimum ? primaryLightColor : primaryColor}
            style={{marginTop: 2}}
          />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPressIn={_handleIncrementPressIn}
        onPressOut={_handlePressOut}
        disabled={isMaximum}>
        <View
          style={[
            {
              borderColor: primaryColor,
              backgroundColor:
                isMaximum || !isIncrementing
                  ? 'transparent'
                  : primaryLightColor,
            },
            styles.stepperIcon,
            styles.stepperPlus,
          ]}>
          <Icon
            name="md-add"
            size={20}
            color={isMaximum ? primaryLightColor : primaryColor}
            style={{marginTop: 2}}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

Stepper.propTypes = {
  theme: PropTypes.shape(Theme),
  onValueChange: PropTypes.func,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  value: PropTypes.number,
  stepValue: PropTypes.number,
};

Stepper.defaultProps = {
  minValue: 0,
  maxValue: 100,
  stepValue: 1,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 94,
    height: 29,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  stepperIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  stepperMinus: {
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  stepperPlus: {
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
});

export default withTheme(Stepper);
