import UseMockjs from '@csii/usemock';

const requireModule = (context) => {
  const fileModule = {};
  context.keys().map((key) => {
    const mod = context(key);
    fileModule[key] = mod.default || mod;
  });
  return fileModule;
};

const jsModules = requireModule(require.context('./api/', true, /\.js$/));
const jsonModules = requireModule(require.context('./data/', true, /\.json$/));

const jsMockList = [];

Object.values(jsModules).forEach((list) => {
  jsMockList.push.apply(jsMockList, list);
});

const jsonMockList = [];
Object.keys(jsonModules).forEach((key) => {
  const action = key.replace('.json', '.do').replace('./', '');
  const mockConf = { path: `${action}`, method: 'post' };
  console.log(mockConf, 'mockConf');
  mockConf.handle = () => jsonModules[key];
  jsonMockList.push(mockConf);
});

UseMockjs.setupMock({
  debug: true,
  routes: [...jsMockList, ...jsonMockList],
});
