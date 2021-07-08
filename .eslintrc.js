module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}, {usePrettierrc: true}], // Use our .prettierrc file as source
    'eslint-comments/no-unlimited-disable': 'off',
    'react-native/no-inline-styles': 'off',
  },
};
