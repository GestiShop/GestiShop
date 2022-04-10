/* eslint import/no-unresolved: off, import/no-self-import: off */
import '@babel/register';
import webpackConfig from './webpack.config.renderer.dev.babel';

module.exports = webpackConfig.default;
