import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ViewPropTypes,
} from "react-native";
import PageControl from "../PageControl";
import { withTheme } from "../../core/theming";
import { Theme } from "../../types/Theme";
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");

const PageControlView = (props) => {
  const {
    theme,
    children,
    containerStyle,
    startPage,
    onPageChange,
    currentPageIndicatorTintColor,
    pageIndicatorTintColor,
    pageIndicatorSize,
  } = props;

  const [currentPage, setCurrentPage] = useState(startPage || 0);
  const scrollView = useRef(undefined);

  const _handleScroll = (event) => {
    const xOffset = event.nativeEvent.contentOffset.x + 10;
    const currentP = Math.floor(xOffset / width);
    setCurrentPage(currentP);
  };

  const _handleScrollEnd = (event) => {
    const xOffset = event.nativeEvent.contentOffset.x + 10;
    const currentP = Math.floor(xOffset / width);
    if (currentP === currentPage) {
      if (onPageChange && typeof onPageChange === "function")
        onPageChange(currentP);
    }
  };

  const _scrollToPage = (pageNumber) => {
    if (scrollView) scrollView.current.scrollTo({ x: width * pageNumber });
  };

  const numberOfPages = React.Children.count(children);

  useEffect(() => {
    if (startPage) _scrollToPage(startPage);
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        ref={scrollView}
        automaticallyAdjustContentInsets={false}
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled
        onScroll={_handleScroll}
        onMomentumScrollEnd={_handleScrollEnd}
      >
        {React.Children.map(children, (child) => (
          <View style={styles.pageStyle}>{child}</View>
        ))}
      </ScrollView>
      <View style={styles.controlsContainer}>
        <PageControl
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          updateCurrentPageDisplay={_scrollToPage}
          currentPageIndicatorTintColor={currentPageIndicatorTintColor}
          pageIndicatorTintColor={pageIndicatorTintColor}
          size={pageIndicatorSize}
        />
      </View>
    </View>
  );
};

PageControlView.propTypes = {
  theme: PropTypes.shape(Theme),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  containerStyle: ViewPropTypes.style,
  startPage: PropTypes.number,
  onPageChange: PropTypes.func,
  currentPageIndicatorTintColor: PropTypes.string,
  pageIndicatorTintColor: PropTypes.string,
  pageIndicatorSize: PropTypes.number,
};

export default withTheme(PageControlView);

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  pageStyle: {
    width,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },
});
