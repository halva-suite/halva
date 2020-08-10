export const configChange = (
  accessor: string,
  key: any,
  value: any,
  configPath: string
) => {
  let config = require(configPath);
  if (accessor == 'set') {
    if (!config.project) {
      config.project = {};
    }
    config.project[key] = value;
    console.log(config);
    console.log('Setting project-level parameters is not supported yet');
  } else if (accessor == 'get') {
    if (!config.project[key]) {
      throw new Error('Key not defined');
    }
    console.log(`Key: ${key}, value: ${config.project[key]}`);
  } else {
    throw new Error('invalid accessor');
  }
};
