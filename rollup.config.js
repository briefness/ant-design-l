import typescript from 'rollup-plugin-typescript2';
import vuePlugin from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
// 如果依赖模块中存在 es 模块，需要使用 @rollup/plugin-node-resolve 插件进行转换
import nodeResolve from '@rollup/plugin-node-resolve';
export default {
  input: './src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'es',
  },
  plugins: [typescript(), vuePlugin(), css(), nodeResolve()],
  external: ['vue'],
};
