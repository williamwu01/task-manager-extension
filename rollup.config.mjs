import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  // Bundle popup
  {
    input: 'popup.js',
    output: {
      file: 'dist/popup.bundle.js',
      format: 'esm',
    },
    plugins: [resolve(), commonjs()],
  },
  // Bundle background
  {
    input: 'auth/background.js',
    output: {
      file: 'dist/background.bundle.js',
      format: 'esm',
    },
    plugins: [resolve(), commonjs()],
  },
];