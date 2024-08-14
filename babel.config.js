module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    ['nativewind/babel', { loose: true }], 
    ['@babel/plugin-transform-private-methods', { loose: true }],
  ],
};
