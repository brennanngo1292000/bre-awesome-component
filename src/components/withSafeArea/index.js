import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const withSafeArea = (WrappedComponent) => (props) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <WrappedComponent {...props} />
    </SafeAreaView>
  );
};

export default withSafeArea;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
});
