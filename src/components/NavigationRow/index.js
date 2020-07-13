import React from "react";
import { StyleSheet, View } from "react-native";
import RowItem from "../RowItem";
import Icon from "../Icon";
import { withTheme } from "../../core/theming";
import { Body } from "../Typography";
import { Theme } from "../../types/Theme";
import { Props as RowProps } from "../RowItem";
import PropTypes from "prop-types";

const NavigationRow = (props) => {
  const { onPress } = props;
  const _renderRightComponent = () => {
    const {
      info,
      theme: { placeholderColor },
    } = props;
    return (
      <View style={styles.row}>
        {info ? (
          <Body style={{ color: placeholderColor, paddingRight: 10 }}>
            {info}
          </Body>
        ) : null}
        <Icon
          type={"Iconions"}
          name="ios-arrow-forward"
          size={22}
          color={placeholderColor}
        />
      </View>
    );
  };
  return (
    <RowItem onPress={onPress} renderRight={_renderRightComponent} {...props} />
  );
};

NavigationRow.propTypes = {
    theme: PropTypes.shape(Theme),
    onPress:PropTypes.func,
    info: PropTypes.string,
    ...RowProps,
};

export default withTheme(NavigationRow);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
