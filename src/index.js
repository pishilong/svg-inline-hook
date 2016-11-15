import fs from 'fs';

const compile = (filename) => {
  let result = {};

  const content = fs.readFileSync(filename, 'utf-8');

  result.code = 'module.exports = ' + JSON.stringify(content);

  return result.code;
};

const loader = (module, filename) => {
  return module._compile(compile(filename), filename);
};

const addHook = () => {
  require.extensions['.svg'] = (module, filename) => {
    loader(module, filename);
  };
};

addHook();
