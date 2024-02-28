import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { DEFAULT_EXTENSIONS } from '@babel/core';

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];
const root = process.platform === 'win32' ? path.resolve('/') : '/';



// external and globals
// are required for 'umd' output
// which has not been tested.
const external = (id) => !id.startsWith('.') && !id.startsWith(root);
const globals = (id) => id;

const config = (dirname, name = null) => {
  const reslv = (p) => path.resolve(dirname, p);
  const output = [];
  if (name) {
    output.push({
      format: 'umd',
      dir: 'dist',
      entryFileNames: '[name].umd.js',
      name: name,
      globals,
    });
  } else {
    output.push({
      format: 'cjs',
      dir: 'dist',
      entryFileNames: '[name].js',
    });
  }

  output.push({
    format: 'es',
    dir: 'dist',
    entryFileNames: '[name].es.js',
  });

  return [
    {
      input: {
        index: reslv('src/index.ts'),
      },
      output,
      plugins: [
        peerDepsExternal(),
        nodeResolve({ extensions }),
        typescript({ exclude: 'node_modules/**' }),
      ],
      external,
    },
  ];
};

export default config;

const getSource = (patternInputs) => {
  //@TODO: move to top if all package ready
  const glob = require('glob');
  return patternInputs.reduce((prev, curr) => {
    const input = {};
    glob.sync(curr).forEach((filename) => {
      const moduleName = filename.replace(
        /src\/([\w\d\/\-]+)(\.ts[x]?)?/g,
        '$1',
      );
      input[moduleName] = filename;
    });
    return { ...prev, ...input };
  }, {});
};

export const getConfig = (patternInputs, name = null) => {
  const output = [];
  if (name) {
    output.push({
      format: 'umd',
      dir: 'dist',
      entryFileNames: '[name].umd.js',
      name: name,
      globals,
    });
  } else {
    output.push({
      format: 'cjs',
      dir: 'dist',
      entryFileNames: '[name].js',
    });
  }

  output.push({
    format: 'es',
    dir: 'dist',
    entryFileNames: '[name].es.js',
  });

  const baseConfig = {
    input: getSource(patternInputs),
    output,
    plugins: [
      peerDepsExternal(),
      nodeResolve({ extensions }),
      typescript({ exclude: 'node_modules/**' }),
    ],
    external,
  };

  return baseConfig;
};
