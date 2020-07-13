import React from 'react';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import {withTheme} from '../../core/theming';
import {Footnote} from '../Typography';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';

const TableViewHeader = (props) => {
  const {header, theme, style} = props;
  return (
    <View
      style={[
        styles.header,
        {backgroundColor: theme.footnoteBackgroundColor},
        style,
      ]}>
      <Footnote style={{color: theme.footnoteColor}}>
        {header.toUpperCase()}
      </Footnote>
    </View>
  );
};

TableViewHeader.propTypes = {
  header: PropTypes.string,
  theme: PropTypes.shape(Theme),
  style: ViewPropTypes.style,
};

export default withTheme(TableViewHeader);

const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 7,
  },
});
