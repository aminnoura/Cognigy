const { fusebox } = require('fuse-box');
const path = require('path');
const fuse = fusebox({
  cache: true,
  devServer: process.env.DEVELOPMENT == 1,
  runServer: process.env.DEVELOPMENT == 1,
  entry: 'src/index.tsx',
  hmr : true,
  target: 'browser',
  webIndex: {
    template: 'src/index.html',
  },
  plugins: []
});
if (process.env.DEVELOPMENT == 1) {
  fuse.runDev({
    bundles: {
      app: 'app.js',
      distRoot: path.join(__dirname, 'dist'),
    }
  });
} else {
  fuse.runProd({
    bundles: {
      app: { path: 'app.js', publicPath: '.' },
      distRoot: path.join(__dirname, 'prod'),
    },
  });
}