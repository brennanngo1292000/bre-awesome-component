import React from 'react';
import {Switch as ReactNativeSwitch} from 'react-native';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';

const Switch = (props) => {
  const {theme, onValueChange, trackColor, ...rest} = props;
  return (
    <ReactNativeSwitch
      {...rest}
      onValueChange={onValueChange}
      trackColor={trackColor || theme.positiveColor}
    />
  );
};

Switch.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.bool,
  style: PropTypes.object,
  theme: PropTypes.shape(Theme),
  onValueChange: PropTypes.func,
  trackColor: PropTypes.string,
  thumbColor: PropTypes.string,
};

export default withTheme(Switch);
