import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { withTheme } from "../../core/theming";
import { Theme } from "../../types/Theme";
import PropTypes from "prop-types";

const DEFAULT_SIZE = 8;

const PageControl = (props) => {
  const {
    currentPage,
    updateCurrentPageDisplay,
    pageIndicatorTintColor,
    theme,
    numberOfPages,
    hidesForSinglePage,
    size,
    currentPageIndicatorTintColor,
  } = props;

  const dot = {
    width: size || DEFAULT_SIZE,
    height: size || DEFAULT_SIZE,
    borderRadius: size || DEFAULT_SIZE,
    margin: (size || DEFAULT_SIZE) / 2,
  };
  const activeDot = {
    backgroundColor: currentPageIndicatorTintColor || theme.barColor,
  };
  const inactiveDot = {
    backgroundColor: pageIndicatorTintColor || theme.dividerColor,
  };
  const dotWrapper = {
    width: (size || DEFAULT_SIZE) * 2,
    height: (size || DEFAULT_SIZE) * 2,
  };

  const _updateCurrentPage = (idx) => {
    if (
      !updateCurrentPageDisplay ||
      typeof updateCurrentPageDisplay !== "function"
    )
      return;
    if (idx > currentPage && currentPage + 1 <= numberOfPages)
      updateCurrentPageDisplay(currentPage + 1);
    else if (idx < currentPage && currentPage > 0)
      updateCurrentPageDisplay(currentPage - 1);
  };

  if (hidesForSinglePage && numberOfPages === 1) return null;

  return (
    <View style={styles.row}>
      {[...Array(numberOfPages).keys()].map((idx) => (
        <TouchableWithoutFeedback
          key={`pageControlDot_${idx}`}
          onPress={() => _updateCurrentPage(idx)}
        >
          <View style={[styles.dotWrapper, dotWrapper]}>
            <View
              style={[dot, idx === currentPage ? activeDot : inactiveDot]}
            />
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};
PageControl.propTypes = {
  theme: PropTypes.shape(Theme),
  currentPage: PropTypes.number,
  numberOfPages: PropTypes.number,
  hidesForSinglePage: PropTypes.bool,
  pageIndicatorTintColor: PropTypes.string,
  currentPageIndicatorTintColor: PropTypes.string,
  updateCurrentPageDisplay: PropTypes.func,
  size: PropTypes.number,
};

export default withTheme(PageControl);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
  },
  dotWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});
