import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  findNodeHandle,
  NativeModules,
} from 'react-native';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';

const SECTION_HEIGHT = 18;

const Sections = (props) => {
  const {items, onSectionPress, theme, style, sectionPrimaryColor} = props;
  const [sections, setSections] = useState([]);
  const sectionList = useRef(null);

  let sectionsHeight;
  let sectionsY;
  let panResponder;
  let currentSectionIdx;

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: _handleMove,
    onPanResponderGrant: _handleMove,
  });

  const _handleContainerLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    setSections(_prepareSections(height));
  };

  const _handleLayout = () => {
    NativeModules.UIManager.measure(
      findNodeHandle(sectionList.current),
      (x, y, width, height, pageX, pageY) => {
        sectionsHeight = height;
        sectionsY = pageY;
      },
    );
  };

  const _handleMove = ({nativeEvent: {pageY}}) => {
    if (!sectionsHeight || !sectionsY) {
      return;
    }

    const sectionIdx = Math.round(
      ((pageY - sectionsY) * items.length) / sectionsHeight,
    );
    if (
      sectionIdx >= 0 &&
      sectionIdx < items.length &&
      currentSectionIdx !== sectionIdx
    ) {
      currentSectionIdx = sectionIdx;
      onSectionPress(sectionIdx);
    }
  };

  const _prepareSections = (parentHeight) => {
    let slots = (parentHeight - 50) / SECTION_HEIGHT;
    if (slots >= items.length) {
      return [...items];
    }

    if (!(slots % 2)) {
      slots += 1;
    }

    const dotsCount = Math.floor(slots / 2);
    const visibleSectionsCount = slots - dotsCount;
    const sectionsCountPerDot =
      (items.length - visibleSectionsCount) / dotsCount;

    let sum = 0;
    const visibleSections = [items[0], null]; // make first item visible
    for (let i = 0; i < dotsCount - 1; i++) {
      sum += 1 + sectionsCountPerDot;
      const visibleSectionIdx = Math.round(sum);
      visibleSections.push(items[visibleSectionIdx], null);
    }
    visibleSections.push(items[items.length - 1]); // make last item visible
    // Each null in visbleSections array is a dot
    return visibleSections;
  };

  const _renderSection = (item, index) => {
    if (item) {
      return (
        <Text
          key={index}
          style={[
            {color: sectionPrimaryColor || theme.primaryColor},
            styles.section,
          ]}>
          {item}
        </Text>
      );
    }
    return (
      <View key={index} style={styles.dotContainer}>
        <View
          style={[
            {backgroundColor: sectionPrimaryColor || theme.primaryColor},
            styles.dot,
          ]}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        {backgroundColor: theme.barColor},
        styles.container,
        style && style,
      ]}
      onLayout={_handleContainerLayout}>
      <View
        style={styles.sections}
        {...panResponder.panHandlers}
        onLayout={_handleLayout}
        ref={sectionList}>
        {sections.map(_renderSection)}
      </View>
    </View>
  );
};

Sections.propTypes = {
  theme: PropTypes.shape(Theme),
  onSectionPress: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.string),
  sectionPrimaryColor: PropTypes.string,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: 20,
    maxWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sections: {
    width: 45,
  },
  section: {
    fontSize: 14,
    height: SECTION_HEIGHT,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  dotContainer: {
    height: SECTION_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default withTheme(Sections);
