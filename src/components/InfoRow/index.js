import React from "react";
import RowItem from "../RowItem";
import { Body } from "../Typography";
import { withTheme } from "../../core/theming";
import { Props as RowProps } from "../RowItem";
import PropTypes from "prop-types";

const InfoRow = (props) => {
  const _renderRight = () => {
    const {
      info,
      theme: { placeholderColor },
    } = props;
    return <Body style={{ color: placeholderColor }}>{info}</Body>;
  };

  return <RowItem renderRight={_renderRight} {...props} />;
};

InfoRow.propTypes = {
  info: PropTypes.string,
  ...RowProps,
};

export default withTheme(InfoRow);
