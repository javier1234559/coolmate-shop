import { RefineThemes, useNotificationProvider } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import { Refine } from '@refinedev/core';
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router-v6';
import { App as AntdApp, ConfigProvider } from 'antd';
import { dataProvider } from './rest-data-provider';
import { TShirt, User, Checks, ShoppingCartSimple, Tag } from 'phosphor-react';
import authProvider from './auth-provider';
import { Outlet } from 'react-router-dom';

//example from: https://github.com/refinedev/refine/blob/master/examples/base-antd/src/App.tsx
// const API_URL = 'https://api.fake-rest.refine.dev';
const API_URL = 'http://localhost:8080/api';

export function RefineContext() {
  return (
    <ConfigProvider theme={RefineThemes.Yellow}>
      <AntdApp>
        <Refine
          authProvider={authProvider}
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
                icon: <User size={24} />,
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
                icon: <TShirt size={24} />,
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
                icon: <Tag size={24} />,
              },
            },
            {
              name: 'carts',
              list: 'refine/carts',
              show: 'refine/carts/show/:id',
              meta: {
                canDelete: true,
                icon: <ShoppingCartSimple size={24} />,
              },
            },
            {
              name: 'orders',
              list: 'refine/orders',
              show: 'refine/orders/show/:id',
              edit: 'refine/orders/edit/:id',
              meta: {
                canDelete: true,
                icon: <Checks size={24} />,
              },
            },
          ]}
          options={{ syncWithLocation: true, warnWhenUnsavedChanges: true }}>
          <Outlet />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}
