  
const { fusebox } = require('fuse-box');
const path = require('path');
const fuse = fusebox({
  cache: true,
  devServer: true,
  entry: 'src/index.tsx',
  hmr : true,
  target: 'browser',
//   useTypescriptCompiler: true,
  webIndex: {
    template: 'src/index.html',
  },
  plugins: []
});

fuse.runDev({
  bundles: {
    app: 'app.js',
    distRoot: path.join(__dirname, 'dist'),
  },
});