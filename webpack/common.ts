import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'
// import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import path from 'path';

const rootDir = path.resolve(__dirname, '..');
const BUILD_DIR = path.resolve(__dirname, 'public');

const config: webpack.Configuration = {
   entry: {
      bundle: [path.resolve(rootDir, 'src/index.tsx')],
   },
   output: {
      path: BUILD_DIR,
      filename: '[name].js',
      globalObject: 'this',
      publicPath: '/',
   },
   plugins: [
      new webpack.EnvironmentPlugin({
         envType: 'dev',
      }),
      new HtmlWebpackPlugin({
         template: path.resolve(rootDir, 'src/app/template.html'),
         hash: true,
         chunks: ['common', 'bundle', 'styles'],
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
   ]
}

export default config;
