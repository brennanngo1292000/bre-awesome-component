import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  ViewPropTypes,
} from 'react-native';
import {withTheme} from '../../core/theming';
import {Footnote} from '../Typography';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';

const TableViewFooter = (props) => {
  const {footer, theme, style, onPress} = props;

  const _renderFooter = () => {
    return (
      <View
        style={[
          styles.footer,
          {backgroundColor: theme.footnoteBackgroundColor},
          style,
        ]}>
        <Footnote
          style={{color: onPress ? theme.primaryColor : theme.footnoteColor}}>
          {footer}
        </Footnote>
      </View>
    );
  };

  const _renderTouchableFooter = () => (
    <TouchableHighlight onPress={onPress}>
      {_renderFooter()}
    </TouchableHighlight>
  );

  if (onPress) {
    return _renderTouchableFooter();
  }
  return _renderFooter();
};

TableViewFooter.propTypes = {
  footer: PropTypes.string,
  theme: PropTypes.shape(Theme),
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
};

export default withTheme(TableViewFooter);

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 15,
    paddingTop: 7,
    paddingBottom: 15,
  },
});
