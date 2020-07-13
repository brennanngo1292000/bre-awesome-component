import React, {useRef} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import RowItem from '../RowItem';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';

const TextFieldRow = (props) => {
  const {
    value,
    placeholder,
    onValueChange,
    theme: {placeholderColor, primaryColor, textColor},
    title,
  } = props;

  const input = useRef(undefined);

  const _focusInput = () => {
    if (input) input.current.focus();
  };

  const _renderRightComponent = () => {
    return (
      <TextInput
        ref={input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        onChangeText={onValueChange}
        style={[styles.input, {color: textColor}]}
        selectionColor={primaryColor}
      />
    );
  };
  return (
    <RowItem
      title={title}
      renderRight={_renderRightComponent}
      onPress={_focusInput}
      {...props}
    />
  );
};

TextFieldRow.propTypes = {
  theme: PropTypes.shape(Theme),
  title: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onValueChange: PropTypes.func,
};

TextFieldRow.defaultProps = {
  placeholder: '',
};

export default withTheme(TextFieldRow);

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    fontSize: 18,
    width: '100%',
  },
});
