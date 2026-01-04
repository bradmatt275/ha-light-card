import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/lights-room-card.ts',
  output: {
    file: 'dist/lights-room-card.js',
    format: 'es',
    sourcemap: dev ? true : false,
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    !dev && terser({
      format: {
        comments: false,
      },
    }),
  ].filter(Boolean),
};
