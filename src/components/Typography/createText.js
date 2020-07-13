import React from "react";
import StyledText from "./StyledText";

const createText = (config) => (props) => (
  <StyledText {...props} config={config} />
);

export default createText;
