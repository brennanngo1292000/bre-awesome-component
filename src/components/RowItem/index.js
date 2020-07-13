import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "../Icon";
import { Body, Caption1 } from "../Typography/Typography";
import { withTheme } from "../../core/theming";
import { Theme } from "../../types/Theme";
import PropTypes from "prop-types";

const RowItem = (props) => {
  const { renderRight, rightComponent,icon, title, subtitle, theme, first, last, onPress } = props;

  const _renderRight = () => {
    if (typeof renderRight == 'function') {
      return <View style={styles.rightComponent}>{renderRight()}</View>;
    }
    if (rightComponent) {
      return (
        <View style={styles.rightComponent}>
          {React.createElement(rightComponent)}
        </View>
      );
    }

    return null;
  };

  const _renderRow = () => {
    return (
      <View
        style={[
          styles.row,
          {
            backgroundColor: theme.barColor,
            borderTopWidth: first ? StyleSheet.hairlineWidth : 0,
            borderBottomWidth: last ? StyleSheet.hairlineWidth : 0,
            borderColor: theme.dividerColor,
          },
        ]}
      >
        {icon && <Icon {...icon} />}
        <View
          style={[
            styles.titleWrapper,
            {
              marginLeft: icon ? 15 : 0,
              marginRight: title || subtitle ? 15 : 0,
            },
          ]}
        >
          {!!title && <Body>{title}</Body>}
          {subtitle && <Caption1>{subtitle}</Caption1>}
        </View>
        {_renderRight()}
      </View>
    );
  };

  const _renderTouchableRow = () => (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={theme.footnoteColor}
      style={{ backgroundColor:theme.barColor }}
    >
      {_renderRow()}
    </TouchableHighlight>
  );

  return (
    <View style={{ backgroundColor: theme.barColor }}>
      {onPress ? _renderTouchableRow() : _renderRow()}
      {!last && (
        <View
          style={[
            styles.separator,
            {
              backgroundColor: theme.dividerColor,
              marginLeft: icon ? 54 : 15,
            },
          ]}
        />
      )}
    </View>
  );
};

export const Props =  {
    theme: PropTypes.shape(Theme),
    icon: PropTypes.object,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    rightComponent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node,
    ]),
    renderRight: PropTypes.func,
    onPress: PropTypes.func,
    first: PropTypes.bool,
    last: PropTypes.bool,
  };

RowItem.propTypes = Props;

export default withTheme(RowItem);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 4,
    minHeight: 43,
  },
  titleWrapper: {
    flexDirection: "column",
    justifyContent: "center",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
  rightComponent: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
});
