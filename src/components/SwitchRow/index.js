import React from 'react';
import RowItem from '../RowItem';
import Switch from '../Switch';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';

const SwitchRow = (props) => {
  const {value, onValueChange, theme} = props;

  const _renderRight = () => {
    return <Switch onValueChange={onValueChange} theme={theme} value={value} />;
  };

  return <RowItem title="" renderRight={_renderRight} {...props} />;
};

SwitchRow.propTypes = {
  theme: PropTypes.shape(Theme),
  value: PropTypes.bool,
  onValueChange: PropTypes.func,
};

export default withTheme(SwitchRow);
