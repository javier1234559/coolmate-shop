import { Refine } from '@refinedev/core';
import dataProvider from '@refinedev/simple-rest';
// import legacyRouterProvider from '@refinedev/react-router-v6/legacy';
import { RefineThemes, ThemedLayoutV2 } from '@refinedev/antd';

import { App as AntdApp, ConfigProvider } from 'antd';

import '@refinedev/antd/dist/reset.css';

export function RefineContext({ children }) {
  return (
    <ConfigProvider theme={RefineThemes.Blue}>
      <AntdApp>
        <Refine
          // routerProvider={legacyRouterProvider}
          dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
          resources={[
            {
              name: 'products',
              list: 'refine/products',
            },
          ]}
          options={{ syncWithLocation: true }}>
          <ThemedLayoutV2>{children}</ThemedLayoutV2>
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}
