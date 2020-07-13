import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import Icon from '../Icon';
import {Caption2} from '../Typography';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';

const Toolbar = (props) => {
  const {
    theme: {barColor, dividerColor, primaryColor, disabledColor},
    items,
  } = props;
  const toolbarStyle = {
    backgroundColor: barColor,
    borderTopColor: dividerColor,
  };
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.wrapper, toolbarStyle]}>
      {items.map((item, idx) => (
        <TouchableWithoutFeedback
          // eslint-disable-next-line
          key={`toolbarItem_${idx}`}
          onPress={() => item.onPress(idx)}
          disabled={item.disabled}>
          <View style={[styles.toolbarItem, {width: width / items.length}]}>
            {item.icon && (
              <Icon
                name={item.icon}
                size={30}
                color={item.disabled ? disabledColor : primaryColor}
              />
            )}
            {item.title && (
              <Caption2
                style={{
                  color: item.disabled ? disabledColor : primaryColor,
                }}>
                {item.title}
              </Caption2>
            )}
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

Toolbar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string,
      onPress: PropTypes.func,
      disabled: PropTypes.bool,
    }),
  ),
  theme: PropTypes.shape(Theme),
};

export default withTheme(Toolbar);

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  toolbarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
});
