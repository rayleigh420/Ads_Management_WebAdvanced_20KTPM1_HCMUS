import { Layout } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

const { Content } = Layout;

export default function LayoutAll() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className='bg-white'>
      <Header />
      {/* <Layout
        className='site-layout'
        style={{ marginLeft: collapsed ? 138 : 347, transition: 'all 0.2s' }}
      >
        <SiderMenu collapsed={collapsed} setCollapsed={setCollapsed} />
      </Layout> */}
      <Layout className={` bg-white duration-500 ease-in-out' `}>
        <Content className='p-6 m-auto transition '>
          <Outlet />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}
