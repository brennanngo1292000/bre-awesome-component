import * as React from 'react';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';
import SegmentedControlC from '@react-native-community/segmented-control';

const SegmentedControl = (props) => {
  const {theme, selectedIndex, values, ...rest} = props;

  const _onValueChange = (e) =>
    onValueChange &&
    onValueChange(e.nativeEvent.value, e.nativeEvent.selectedSegmentIndex);

  return (
    <SegmentedControlC
      tintColor={theme.primaryColor}
      {...rest}
      values={values}
      selectedIndex={selectedIndex}
      onChange={_onValueChange}
      onValueChange={undefined}
    />
  );
};

SegmentedControl.propTypes = {
  theme: PropTypes.shape(Theme),
  values: PropTypes.arrayOf(PropTypes.string),
  onValueChange: PropTypes.func,
  selectedIndex: PropTypes.number,
  tintColor: PropTypes.string,
};

export default withTheme(SegmentedControl);
