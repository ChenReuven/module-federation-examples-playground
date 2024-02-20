import fs from 'fs';
import appTools, { defineConfig } from '@modern-js/app-tools';
import DashboardPlugin from '@module-federation/dashboard-plugin';
import AdaptMedusaPlugin from './AdaptMedusaPlugin';

// TODO: Add env file.
// const tokens = fs
//   .readFileSync(__dirname + '/../.env')
//   .toString('utf-8')
//   .split('\n')
//   .map(v => v.trim().split('='));
// process.env.DASHBOARD_READ_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_READ_TOKEN')[1];
// process.env.DASHBOARD_WRITE_TOKEN = tokens.find(([k]) => k === 'DASHBOARD_WRITE_TOKEN')[1];
// process.env.DASHBOARD_BASE_URL = tokens.find(([k]) => k === 'DASHBOARD_BASE_URL')[1];

const dashboardURL = `${process.env.DASHBOARD_BASE_URL}/update?token=${process.env.DASHBOARD_WRITE_TOKEN}`;

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  server: {
    port: 3001,
  },
  dev: {
    // set publicPath
    assetPrefix: 'http://localhost:3001/',
  },
  runtime: {
    router: true,
  },
  source: {
    // automatically generated asynchronous boundary via Dynamic Import, allowing the page code to consume remote modules generated by the module federation.
    enableAsyncEntry: true,
  },
  tools: {
    webpack: (config, { webpack, appendPlugins }) => {
      appendPlugins([
        new webpack.container.ModuleFederationPlugin({
          name: 'host',
          remotes: {
            provider: DashboardPlugin.clientVersion({
              currentHost: 'host',
              remoteName: 'provider',
              dashboardURL,
            }),
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
          },
        }),
        // TODO: Fix medusa plugin being pnpm compatible
        // new DashboardPlugin({
        //   versionStrategy: `${Date.now()}`,
        //   filename: 'dashboard.json',
        //   dashboardURL,
        //   metadata: {
        //     clientUrl: process.env.DASHBOARD_BASE_URL,
        //     baseUrl: 'http://localhost:3001',
        //     source: {
        //       url: 'https://github.com/module-federation/federation-dashboard/tree/master/modernjs/modernjs/host',
        //     },
        //     remote: 'http://localhost:3001/remoteEntry.js',
        //   },
        // }),
        // DashboardPlugin will read package.json , but modern.js has temp entry which will cause dashboard-plugin/convertToGraph.js:118:43 has error
        new AdaptMedusaPlugin(),
      ]);
    },
  },
  plugins: [appTools()],
});