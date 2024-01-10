import { Layout } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import SiderMenuWard from '../sider/SiderWard';

const { Content } = Layout;

export default function LayoutWard() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className='bg-white'>
      <Header />
      <Layout
        className='site-layout'
        style={{ marginLeft: collapsed ? 138 : 347, transition: 'all 0.2s' }}
      >
        <SiderMenuWard collapsed={collapsed} setCollapsed={setCollapsed} />
      </Layout>
      <Layout
        className={`${
          !collapsed ? 'ml-[347px]' : 'ml-[140px]'
        } bg-white duration-500 ease-in-out ' `}
      >
        <Content className='p-6 m-auto transition w-full'>
          <Outlet />
        </Content>
      </Layout>
      {/* <Footer /> */}
    </Layout>
  );
}
