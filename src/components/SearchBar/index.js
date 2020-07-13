import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '../Icon';
import {withTheme} from '../../core/theming';
import {Theme} from '../../types/Theme';
import PropTypes from 'prop-types';
import withSafeArea from '../withSafeArea';

const SearchBar = (props) => {
  const {
    onFocus,
    onBlur,
    animationTime,
    value,
    placeholder,
    onValueChange,
    theme: {
      barColor,
      backgroundColor,
      placeholderColor,
      textColor,
      primaryColor,
    },
    withCancel,
    cancelText,
    animated,
  } = props;
  const [anim, setAnim] = useState(new Animated.Value(0));
  const [cancelWidth, setCancelWidth] = useState(0);
  const _input = useRef(null);

  const _clearInput = () => onValueChange && onValueChange('');
  const _cancelInput = () => {
    onValueChange && onValueChange('');
    if (_input) _input.current.blur();
  };
  const _focusInput = () => {
    if (_input) _input.current.focus();
  };
  const _handleInputFocus = () => {
    _animateTo(1);
    if (typeof onFocus === 'function') onFocus();
  };
  const _handleInputBlur = () => {
    _animateTo(0);
    if (typeof onBlur === 'function') onBlur();
  };

  const _handleLayout = ({
    nativeEvent: {
      layout: {width},
    },
  }) => {
    setCancelWidth(width);
  };

  const _animateTo = (toValue) => {
    Animated.timing(anim, {
      toValue,
      easing: Easing.linear,
      duration: animationTime,
      useNativeDriver:false, 
    }).start();
  };
  const {width} = Dimensions.get('window');
  return (
    <View style={[{backgroundColor, width}, styles.container]}>
      <TouchableHighlight
        underlayColor={backgroundColor}
        onPress={_focusInput}
        onLongPress={_focusInput}
        style={styles.inputTouchWrapper}>
        <Animated.View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: barColor,
              width: animated
                ? anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [width - 20, width - 20 - cancelWidth],
                  })
                : width - 20 - cancelWidth,
            },
          ]}>
          <Icon
            type={'ionicons'}
            name="ios-search"
            color={placeholderColor}
            style={styles.searchIcon}
            size={18}
          />
          <TextInput
            ref={_input}
            style={[{color: textColor}, styles.input]}
            value={value}
            onChangeText={onValueChange}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            selectionColor={primaryColor}
            onFocus={_handleInputFocus}
            onBlur={_handleInputBlur}
          />
          {value ? (
            <TouchableOpacity onPress={_clearInput}>
              <Icon
                type={'ionicons'}
                name="ios-close-circle"
                color={placeholderColor}
                style={styles.clearIcon}
                size={20}
              />
            </TouchableOpacity>
          ) : null}
        </Animated.View>
      </TouchableHighlight>
      {withCancel && (
        <View onLayout={_handleLayout}>
          <TouchableOpacity onPress={_cancelInput}>
            <Animated.Text
              style={[
                styles.cancelText,
                {
                  color: primaryColor,
                  opacity: animated ? anim : 1,
                  transform: [
                    {
                      translateX: animated
                        ? anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [cancelWidth - 20, 0],
                          })
                        : 0,
                    },
                  ],
                },
              ]}>
              {cancelText}
            </Animated.Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

SearchBar.propTypes = {
  theme: PropTypes.shape(Theme),
  onValueChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  withCancel: PropTypes.bool,
  cancelText: PropTypes.string,
  animated: PropTypes.bool,
  animationTime: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

SearchBar.defaultProps = {
  placeholder: 'Search',
  withCancel: false,
  cancelText: 'Cancel',
  animated: false,
  animationTime: 200,
};

export default withTheme(withSafeArea(SearchBar));

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width:200
  },
  searchIcon: {
    paddingLeft: 9,
    backgroundColor: 'transparent',
    marginTop: 2,
  },
  clearIcon: {
    paddingRight: 9,
    backgroundColor: 'transparent',
    marginTop: 2,
  },
  inputTouchWrapper: {
    flexGrow: 1,
    borderRadius: 10,
    height:44
  },
  inputWrapper: {
    flexDirection: 'row',
    paddingBottom: 5,
    paddingTop: 3,
    borderRadius: 10,
    flexGrow: 1,
    height: 40,
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: {
    backgroundColor: 'transparent',
    paddingHorizontal: 7,
    fontSize: 16,
    flexGrow: 1,
    width:40,
    height:40
  },
  cancelText: {
    fontSize: 16,
    paddingHorizontal: 7,
  },
});
