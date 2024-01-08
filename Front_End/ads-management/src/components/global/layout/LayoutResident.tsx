import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

const { Content } = Layout;

export default function LayoutResident() {
  return (
    <Layout className='bg-white'>
      <Header />
      <Layout className='site-layout'></Layout>
      <Layout>
        <Content className='p-6 m-auto transition w-full'>
          <Outlet />
        </Content>
      </Layout>
      {/* <Footer /> */}
    </Layout>
  );
}
