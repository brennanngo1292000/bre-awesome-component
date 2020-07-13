import React from 'react';
import {View, ViewPropTypes} from 'react-native';
import TableViewHeader from './TableViewHeader';
import TableViewFooter from './TableViewFooter';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';

const TableView = (props) => {
  const {
    header,
    children,
    footer,
    withoutHeader,
    withoutFooter,
    headerStyle,
    footerStyle,
    onFooterPress,
  } = props;
  return (
    <View>
      {!withoutHeader && !!header && (
        <TableViewHeader header={header} style={headerStyle} />
      )}
      {React.Children.map(children, (child, idx) =>
        React.cloneElement(child, {
          first: idx === 0,
          last: idx === React.Children.count(children) - 1,
        }),
      )}
      {!withoutFooter && !!footer && (
        <TableViewFooter
          footer={footer}
          onPress={onFooterPress}
          style={footerStyle}
        />
      )}
    </View>
  );
};

TableView.propTypes = {
  theme: PropTypes.shape(Theme),

  header: PropTypes.string,

  withoutHeader: PropTypes.bool,

  headerStyle: ViewPropTypes.style,

  footer: PropTypes.string,

  withoutFooter: PropTypes.bool,

  footerStyle: ViewPropTypes.style,

  onFooterPress: PropTypes.func,

  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

TableView.defaultProps = {
  header: '',
  footer: '',
};

export default withTheme(TableView);
