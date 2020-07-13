import React, {memo} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Icon from '../Icon';
import {Caption2} from '../Typography';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';

const TabBar = (props) => {
  const {
    theme: {
      barColor,
      dividerColor,
      primaryColor,
      disabledColor,
      primaryLightColor,
    },
    tabs,
  } = props;
  const tabBarStyle = {
    backgroundColor: barColor,
    borderTopColor: dividerColor,
  };
  const {width} = Dimensions.get('window');
  return (
    <View style={[styles.wrapper, tabBarStyle]}>
      {tabs.map((tab, idx) => (
        <TouchableWithoutFeedback
          key={`tabItem_${idx}`}
          onPress={() => tab.onPress(idx)}
          disabled={tab.disabled || tab.isActive}>
          <View style={[styles.tabItem, {width: width / tabs.length}]}>
            <Icon
              name={tab.icon}
              size={30}
              color={
                tab.isActive
                  ? primaryColor
                  : tab.disabled
                  ? disabledColor
                  : primaryLightColor
              }
            />
            <Caption2
              style={{
                color: tab.isActive
                  ? primaryColor
                  : tab.disabled
                  ? disabledColor
                  : primaryLightColor,
              }}>
              {tab.title}
            </Caption2>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string,
      onPress: PropTypes.func,
      isActive: PropTypes.bool,
      disabled: PropTypes.bool,
    }),
  ),
  theme: PropTypes.shape(Theme),
};

export default memo(withTheme(TabBar));

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
});
