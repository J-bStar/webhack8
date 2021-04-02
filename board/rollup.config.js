import replace from '@rollup/plugin-replace';

export default {
  input: 'index.js',
  output: {
    dir: 'output',
    format: 'cjs',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion: 15,
      values: {
        preventAssignment: true,
      },
    }),  
  ],
};