import React from "react";
import RowItem from "../RowItem";
import Icon from "../Icon";
import { withTheme } from "../../core/theming";
import { Props as RowProps } from "../RowItem";
import PropTypes from "prop-types";

const CheckboxRow = (props) => {
  const { selected, theme } = props;
  const _renderRight = () => {
    if (selected) {
      return (
        <Icon
          name="ios-checkmark"
          size={30}
          color={theme.primaryColor}
          theme={theme}
        />
      );
    }
    return null;
  };
  return <RowItem renderRight={_renderRight} {...props} />;
};

CheckboxRow.propTypes = {
  selected: PropTypes.bool,
  ...RowProps
};

export default withTheme(CheckboxRow);
