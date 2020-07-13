import  React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native';
import { withTheme } from '../../core/theming';
import Icon from '../Icon';
import { Theme } from '../../types/Theme';
import PropTypes from 'prop-types';

const TextField = (props) => {
  const {
    value,
    placeholder,
    onValueChange,
    clearButton,
    theme: {
      backgroundColor,
      dividerColor,
      placeholderColor,
      primaryColor,
      textColor,
    },
    containerStyle,
    inputStyle,
    ...rest
  } = props;

  const _clearInput = () => onValueChange && onValueChange('');

  
    return (
      <View
        style={[
          { backgroundColor, borderBottomColor: dividerColor },
          styles.container,
          containerStyle,
        ]}
      >
        <TextInput
          {...rest}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          onChangeText={onValueChange}
          style={[styles.input, { color: textColor }, inputStyle]}
          selectionColor={primaryColor}
        />
        {value && clearButton !== false ? (
          <TouchableOpacity onPress={_clearInput}>
            <Icon
              name="ios-close-circle"
              color={placeholderColor}
              style={styles.clearIcon}
              size={18}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
}


TextField.propTypes = {
  theme: PropTypes.shape(Theme) ,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  clearButton: PropTypes.bool,
  onValueChange: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  inputStyle: PropTypes.object,
};


export default withTheme(TextField);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    flexGrow: 1,
    paddingRight: 15,
  },
  clearIcon: {
    paddingRight: 9,
    backgroundColor: 'transparent',
    marginTop: 2,
  },
});
