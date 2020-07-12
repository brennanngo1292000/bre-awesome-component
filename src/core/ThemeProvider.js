import React from "react";
import { ThemeProvider } from "./theming";
import { Theme } from "../types/Theme";
import PropTypes from "prop-types";

const ThemeProvider = (props) => {
    const {theme, children} = props;
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.shape(Theme),
};

export default ThemeProvider;
