import React from "react";
import { Platform, ProgressViewIOS } from "react-native";
import { Theme } from "../../types/Theme";
import { withTheme } from "../../core/theming";
import PropTypes from "prop-types";
import ProgressBarC from "./ProgressBar";

const ProgressBar = (props) => {
  const {
    progress,
    theme: { primaryColor },
  } = props;
  if (Platform.OS == "ios") {
    return (
      <ProgressViewIOS progress={progress} progressTintColor={primaryColor} />
    );
  }
  return <ProgressBarC progress={progress} color={primaryColor} />
};

ProgressBar.propTypes = {
  theme: PropTypes.shape(Theme),
  progress: PropTypes.number,
};

export default withTheme(ProgressBar);
