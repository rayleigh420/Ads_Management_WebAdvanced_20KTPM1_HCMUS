import { IMAGES } from '@/utils/theme';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import UserMenu from '../user-menu';
import './Header.scss';

const Header = () => {
  return (
    <Layout.Header
      className='sticky top-0 z-10 w-full flex justify-between items-center'
      style={{
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <Link to='/' className='flex items-center'>
        <img src={IMAGES.LOGO} alt='kiwi-logo' />
      </Link>

      <UserMenu />
    </Layout.Header>
  );
};

export default Header;
