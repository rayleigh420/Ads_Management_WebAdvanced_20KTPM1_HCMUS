import { RootState } from '@/store';
import { IMAGES } from '@/utils/theme';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserMenu from '../user-menu';
import './Header.scss';

const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <Layout.Header
      className='sticky top-0 z-10 w-full flex justify-between items-center'
      style={{
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <Link to={`/${auth.type}`} className='flex items-center'>
        <img src={IMAGES.LOGO} alt='lotus-logo' />
      </Link>

      <UserMenu />
    </Layout.Header>
  );
};

export default Header;
