import { RefineThemes, useNotificationProvider } from '@refinedev/antd';
import '@refinedev/antd/dist/reset.css';
import { Refine } from '@refinedev/core';
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router-v6';
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import { dataProvider } from './rest-data-provider';
import { TShirt, User, Checks, Tag, ArrowsInSimple, Palette, Tree  } from 'phosphor-react';
import authProvider, { axiosInstance } from './auth-provider';
import { Outlet } from 'react-router-dom';

//example from: https://github.com/refinedev/refine/blob/master/examples/base-antd/src/App.tsx
// const API_URL = 'https://api.fake-rest.refine.dev';
const API_URL = 'http://localhost:8080/api';

export function RefineContext(props) {
  return (
    <ConfigProvider
      theme={{
        ...RefineThemes.Blue,
        algorithm: props.currentTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        components: {
          Button: {
            controlHeight: 40,
            borderRadius: 10,
          },
        },
        token: {
          colorPrimary: '#005163',
        },
      }}>
      <AntdApp>
        <Refine
          authProvider={authProvider}
          routerProvider={routerProvider}
          notificationProvider={useNotificationProvider}
          dataProvider={dataProvider(API_URL, axiosInstance)}
          resources={[
            {
              name: 'users',
              list: 'refine/users',
              show: 'refine/users/show/:id',
              create: 'refine/users/create',
              edit: 'refine/users/edit/:id',
              meta: {
                canDelete: true,
                icon: <User size={16} />,
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
                icon: <TShirt size={16} />,
              },
            },
            {
              name: 'collections',
              list: 'refine/collections',
              show: 'refine/collections/show/:id',
              create: 'refine/collections/create',
              edit: 'refine/collections/edit/:id',
              meta: {
                canDelete: true,
                icon: <Tree  size={16} />,
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
                icon: <Tag size={16} />,
              },
            },
            {
              name: 'colors',
              list: 'refine/colors',
              show: 'refine/colors/show/:id',
              create: 'refine/colors/create',
              edit: 'refine/colors/edit/:id',
              meta: {
                canDelete: true,
                icon: <Palette size={16} />,
              },
            },
            {
              name: 'sizes',
              list: 'refine/sizes',
              show: 'refine/sizes/show/:id',
              create: 'refine/sizes/create',
              edit: 'refine/sizes/edit/:id',
              meta: {
                canDelete: true,
                icon: <ArrowsInSimple size={16} />,
              },
            },
            // {
            //   name: 'carts',
            //   list: 'refine/carts',
            //   show: 'refine/carts/show/:id',
            //   meta: {
            //     canDelete: true,
            //     icon: <ShoppingCartSimple size={16} />,
            //   },
            // },
            {
              name: 'orders',
              list: 'refine/orders',
              show: 'refine/orders/show/:id',
              edit: 'refine/orders/edit/:id',
              meta: {
                canDelete: true,
                icon: <Checks size={16} />,
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
