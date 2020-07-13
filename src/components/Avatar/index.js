import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  ViewPropTypes,
} from "react-native";
import PropTypes from "prop-types";
import { Theme } from "../../types/Theme";
import { withTheme } from "../../core/theming";

const Avatar = (props) => {
  const { size, url, style, initials } = props;
  const avatarStyles = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const _renderAvatar = () => {
    if (url) {
      return <Image style={avatarStyles} source={{ uri: url }} />;
    }
    const overlay = require("../../assets//avatartGradient.png");
    return (
      <ImageBackground
        imageStyle={avatarStyles}
        style={[avatarStyles, style]}
        source={overlay}
      >
        <View
          style={[
            styles.letterWrapper,
            {
              height: size,
              width: size,
              borderRadius: size / 2,
            },
          ]}
        >
          <Text style={[styles.letters, { fontSize: size / 2.4 }]}>
            {initials.slice(0, 2)}
          </Text>
        </View>
      </ImageBackground>
    );
  };

  const _renderTouchableAvatar = () => {
    return (
      <TouchableOpacity style={avatarStyles} onPress={onPress}>
        {renderAvatar()}
      </TouchableOpacity>
    );
  };

  if (typeof onPress == "function") {
    return _renderTouchableAvatar();
  }
  return _renderAvatar();
};

Avatar.propTypes = {
  theme: PropTypes.shape(Theme),
  initials: PropTypes.string,
  url: PropTypes.string,
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
};

Avatar.defaultProps = {
  initials: "",
  size: 50,
};

export default withTheme(Avatar);

const styles = StyleSheet.create({
  letterWrapper: {
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  letters: {
    fontFamily: "ArialRoundedMTBold",
    textAlign: "center",
    backgroundColor: "transparent",
    color: "white",
  },
});
