import { RefineThemes, ThemedLayoutV2, useNotificationProvider } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import { GitHubBanner, Refine } from '@refinedev/core';
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router-v6';
import { App as AntdApp, ConfigProvider } from 'antd';
import { dataProvider } from './rest-data-provider';

//example from: https://github.com/refinedev/refine/blob/master/examples/base-antd/src/App.tsx
// const API_URL = 'https://api.fake-rest.refine.dev';
const API_URL = 'http://localhost:8080/api';

export function RefineContext({ children }) {
  return (
    <ConfigProvider theme={RefineThemes.Purple}>
      <AntdApp>
        <GitHubBanner />
        <Refine
          routerProvider={routerProvider}
          notificationProvider={useNotificationProvider}
          dataProvider={dataProvider(API_URL)}
          resources={[
            {
              name: 'users',
              list: 'refine/users',
              show: 'refine/users/show/:id',
              create: 'refine/users/create',
              edit: 'refine/users/edit/:id',
              meta: {
                canDelete: true,
              },
            },
            {
              name: 'products',
              list: 'refine/products',
              show: 'refine/products/show/:id',
              create: 'refine/products/create',
              edit: 'refine/products/edit/:id',
              meta: {
                canDelete: true,
              },
            },
            {
              name: 'categories',
              list: 'refine/categories',
              show: 'refine/categories/show/:id',
              create: 'refine/categories/create',
              edit: 'refine/categories/edit/:id',
              meta: {
                canDelete: true,
              },
            },
            {
              name: 'carts',
              list: 'refine/carts',
              show: 'refine/carts/show/:id',
              meta: {
                canDelete: true,
              },
            },
            {
              name: 'orders',
              list: 'refine/orders',
              show: 'refine/orders/show/:id',
              edit: 'refine/orders/edit/:id',
              meta: {
                canDelete: true,
              },
            },
          ]}
          options={{ syncWithLocation: true, warnWhenUnsavedChanges: true }}>
          <ThemedLayoutV2>{children}</ThemedLayoutV2>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}
