import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Theme} from '../../types/Theme';
import {withTheme} from '../../core/theming';
import PropTypes from 'prop-types';

const Spinner = (props) => {
  const {
    animating,
    size,
    hidesWhenStopped,
    theme: {primaryColor},
  } = props;
  return (
    <ActivityIndicator
      animating={animating}
      size={size}
      hidesWhenStopped={hidesWhenStopped}
      color={primaryColor}
    />
  );
};

Spinner.propTypes = {
  theme: PropTypes.shape(Theme),
  animating: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'large']),
  hidesWhenStopped: PropTypes.bool,
};

Spinner.defaultProps = {
  animating: true,
  size: 'small',
  hidesWhenStopped: true,
};

export default withTheme(Spinner);
