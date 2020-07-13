import React, {useRef} from 'react';
import {View, StyleSheet, SectionList, ViewPropTypes} from 'react-native';
import Sections from './Section';
import {withTheme} from '../../core/theming';
import {Headline} from '../Typography';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

const GroupedList = (props) => {
  const {
    groupBy,
    stickySectionHeadersEnabled,
    renderSectionHeader,
    sections,
    sectionsStyle,
    sectionPrimaryColor,
    getItemLayout,
    ItemSeparatorComponent,
    SectionSeparatorComponent,
    items,
    renderItem,
    renderSectionFooter,
    keyExtractor,
    theme,
  } = props;
  const sectionList = useRef(undefined);
  let sectionHeadersHeights = {};

  const _groupItems = (items) => {
    const grouped = items.reduce((acc, item) => {
      const groupId = groupBy(item);
      if (Object.prototype.hasOwnProperty.call(acc, groupId)) {
        acc[groupId].data.push(item);
      } else {
        acc[groupId] = {title: groupId, data: [item]};
      }
      return acc;
    }, {});

    return Object.values(grouped);
  };

  const _handleSectionPress = (sectionIdx) => {
    const sectionsl = sections || alphabet;
    const {index} = sectionsl.reduce(
      (acc, item, currendIndex) => {
        const newDelta = Math.abs(sectionIdx - currendIndex);
        if (newDelta < acc.delta) {
          return {delta: newDelta, index: currendIndex};
        }
        return acc;
      },
      {delta: sectionsl.length, index: 0},
    );

    if (sectionList) {
      sectionList.current.scrollToLocation({
        viewOffset:
          stickySectionHeadersEnabled !== false
            ? sectionHeadersHeights[sections[index]]
            : 0,
        sectionIndex: index,
        itemIndex: 0,
        animated: false,
      });
    }
  };

  const _renderSectionHeader = (data) => {
    if (renderSectionHeader) {
      return (
        <View
          onLayout={({
            nativeEvent: {
              layout: {height},
            },
          }) => _handleSectionHeaderLayout(height, data)}>
          {renderSectionHeader(data)}
        </View>
      );
    }

    return (
      <View
        style={[styles.header, {backgroundColor: theme.barColor}]}
        onLayout={({
          nativeEvent: {
            layout: {height},
          },
        }) => _handleSectionHeaderLayout(height, data)}>
        <Headline>
          {data.section &&
            typeof data.section === 'object' &&
            data.section.title}
        </Headline>
      </View>
    );
  };

  const _handleSectionHeaderLayout = (height, data) => {
    sectionHeadersHeights[data.section.title] = height;
  };
  const deafultKeyExtractor = (item) => item.key || item.id;
  const Separator = () => (
    <View style={[styles.separator, {backgroundColor: theme.barColor}]} />
  );

  return (
    <View style={styles.container}>
      <SectionList
        initialNumToRender={getItemLayout ? 30 : Number.MAX_SAFE_INTEGER}
        ref={sectionList}
        renderItem={renderItem}
        renderSectionFooter={renderSectionFooter}
        renderSectionHeader={_renderSectionHeader}
        ItemSeparatorComponent={ItemSeparatorComponent || Separator}
        SectionSeparatorComponent={SectionSeparatorComponent}
        sections={_groupItems(items)}
        automaticallyAdjustContentInsets={false}
        getItemLayout={getItemLayout}
        stickySectionHeadersEnabled={stickySectionHeadersEnabled}
        keyExtractor={keyExtractor || deafultKeyExtractor}
      />
      <Sections
        onSectionPress={_handleSectionPress}
        items={sections || alphabet}
        style={sectionsStyle}
        sectionPrimaryColor={sectionPrimaryColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  separator: {
    height: 1,
    marginLeft: 15,
  },
});

GroupedList.propTypes = {
  theme: PropTypes.shape(Theme),
  items: PropTypes.array,
  groupBy: PropTypes.func,
  renderItem: PropTypes.func,
  renderSectionHeader: PropTypes.func,
  ItemSeparatorComponent: PropTypes.any,
  SectionSeparatorComponent: PropTypes.any,
  sections: PropTypes.array,
  sectionsStyle: ViewPropTypes.style,
  sectionPrimaryColor: PropTypes.string,
  getItemLayout: PropTypes.func,
  stickySectionHeadersEnabled: PropTypes.bool,
  keyExtractor: PropTypes.func,
};

export default withTheme(GroupedList);
