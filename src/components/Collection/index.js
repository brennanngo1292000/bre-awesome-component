import React from 'react';
import {
  Dimensions,
  SectionList,
  StyleSheet,
  FlatList,
  RefreshControl,
  ViewPropTypes,
} from 'react-native';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');

const Collection = (props) => {
  const {
    data,
    renderSectionHeader,
    renderSectionFooter,
    onEndReached,
    onRefresh,
    refreshing,
    stickySectionHeadersEnabled,
    onEndReachedThreshold,
    listStyle,
    contentContainerStyle,
    theme,
    renderItem,
    numberOfColumns,
    keyExtractor,
  } = props;

  const _itemStyle = {
    height: width / (numberOfColumns || 4),
    width: width / (numberOfColumns || 4),
  };

  const _renderCell = ({item}) => {
    const child = renderItem(item);
    if (!child) return null;
    return React.cloneElement(child, {
      style: StyleSheet.flatten([child.props.style, _itemStyle]),
    });
  };

  const _renderRow = ({item}) => (
    <FlatList
      style={styles.wrapper}
      numColumns={numberOfColumns}
      renderItem={_renderCell}
      data={item}
      keyExtractor={keyExtractor}
    />
  );

  const _genListSection = (data) =>
    data.map((item) => ({...item, data: [item.data]}));

  const dataList = _genListSection(data);

  return (
    <SectionList
      sections={dataList}
      renderItem={_renderRow}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={(item) => `row_${item}`}
      automaticallyAdjustContentInsets={false}
      renderSectionFooter={renderSectionFooter}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      stickySectionHeadersEnabled={stickySectionHeadersEnabled}
      listStyle={listStyle}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.footnoteColor}
          />
        ) : null
      }
    />
  );
};

Collection.propTypes = {
  theme: PropTypes.shape(Theme),
  numberOfColumns: PropTypes.number,
  data: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
  }),
  renderItem: PropTypes.func,
  renderSectionHeader: PropTypes.func,
  renderSectionFooter: PropTypes.func,
  keyExtractor: PropTypes.func,
  onEndReached: PropTypes.func,
  onEndReachedThreshold: PropTypes.number,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  stickySectionHeadersEnabled: PropTypes.bool,
  listStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
};

Collection.defaultProps = {
  keyExtractor: (item, index) => `${item.key}` || `${index}`,
  numberOfColumns: 4,
  refreshing: false,
};

export default withTheme(Collection);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
