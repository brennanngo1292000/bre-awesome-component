import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {withTheme} from '../../core/theming';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Theme} from '../../types/Theme';

const Icon = (props) => {
  const {type, size, name, style, color, theme, ...rest} = props;

  const _renderRNIcon = () => {
    const typeCheck = type.toLowerCase();
    const sizeSet = Number(size);
    const colorSet = color || theme.primaryColor;
    switch (typeCheck) {
      case 'fontawesome':
        return <FontAwesome size={sizeSet} color={colorSet} name={name} />;
      case 'materialicons':
        return <MaterialIcons size={sizeSet} color={colorSet} name={name} />;
      case 'ionicons':
        return <Ionicons size={sizeSet} color={colorSet} name={name} />;
      case 'fontawesome5':
        return <FontAwesome5 size={sizeSet} color={colorSet} name={name} />;
      case 'fontisto':
        return <Fontisto size={sizeSet} color={colorSet} name={name} />;
      case 'feather':
        return <Feather size={sizeSet} color={colorSet} name={name} />;
      case 'octicons':
        return <Octicons size={sizeSet} color={colorSet} name={name} />;
      case 'antdesign':
        return <AntDesign size={sizeSet} color={colorSet} name={name} />;
      case 'materialcommunityicons':
        return (
          <MaterialCommunityIcons size={sizeSet} color={colorSet} name={name} />
        );
      default:
        return <></>;
    }
  };

  if (typeof name == 'string' && type != null && typeof type == 'string') {
    return _renderRNIcon();
  } else if (
    (typeof name === 'object' &&
      name !== null &&
      name.hasOwnProperty('uri') &&
      typeof name.uri === 'string') ||
    typeof name === 'number'
  ) {
    <Image
      {...rest}
      source={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />;
  }

  return (
    <View
      {...rest}
      style={[
        {
          width: size,
          height: size,
        },
        styles.container,
        style,
      ]}>
      <Text>{name}</Text>
    </View>
  );
};

Icon.propTypes = {
  name: PropTypes.any,
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.any,
  theme: PropTypes.shape(Theme),
  type: PropTypes.string
};

Icon.defaultProps = {
  size: 50,
  type:'ionicons'
};

export default withTheme(Icon);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
