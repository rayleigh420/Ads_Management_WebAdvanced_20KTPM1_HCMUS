import { MY_ROUTE } from '@/routes/route.constant';
import { ICONS, IMAGES } from '@/utils/theme';
import { RightOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '../menu-icon';
import { MenuIconType } from '../menu-icon/MenuIcon';

const { Sider: SideMenuBar } = Layout;
const { Item, SubMenu, Divider } = Menu;

type SiderMenuProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const routes: {
  key: string;
  label: string;
  icons: MenuIconType;
  children?: { key: string; label: string }[];
}[] = [
  { key: 'district', label: 'Quản lý quận', icons: 'district' },
  { key: MY_ROUTE.ADVERTISING_TYPE.self, label: 'Quản lý hình thức quảng cáo ', icons: 'ward' },
  {
    key: MY_ROUTE.REQUIRE_EDIT,
    label: 'Danh sách chỉnh sửa điểm đặt và bảng quảng cáo ',
    icons: 'ward',
  },
  {
    key: MY_ROUTE.ADS.LOCATION,
    label: 'Quản lý điểm đặt quảng cáo',
    icons: 'ads',
  },
];

export default function SiderMenuAdmin({ collapsed, setCollapsed }: SiderMenuProps) {
  const [selectedKeys, setSelectedKeys] = useState('');
  const [openKeys, setOpenKeys] = useState('');

  const isSubmenuActive = (submenuKey: string) => {
    const submenu = routes.find((route) => route.key === submenuKey);
    return !!submenu?.children?.find((menu) => menu.key === selectedKeys);
  };

  return (
    <SideMenuBar
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        marginTop: 60,
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={347}
    >
      <div
        className='flex items-center justify-between gap-1 pt-8 pr-4 pb-6 duration-200'
        style={{ paddingLeft: collapsed ? 44 : 10, borderRight: '1px solid rgba(5, 5, 5, 0.06)' }}
      >
        <img src={IMAGES.LOGO_ICON} alt='kiwi-icon' width={32} height={32} />
        {/* eslint-disable-next-line */}
        <div
          className='flex items-center justify-center w-6 h-6 cursor-pointer duration-200'
          style={{ transform: `rotate(${collapsed ? 0 : 180}deg)` }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <RightOutlined />
        </div>
      </div>
      <Menu
        mode='inline'
        className='h-full'
        defaultOpenKeys={[openKeys]}
        selectedKeys={[selectedKeys]}
      >
        {routes.map((route) => {
          if (route.children) {
            return (
              <SubMenu
                key={route.key}
                title={<div className='pl-4 font-bold text-base'>{route.label}</div>}
                icon={<MenuIcon icon={route.icons} isActive={isSubmenuActive(route.key)} />}
                // onTitleClick={() => handleClickSubMenu(route.key)}
              >
                {route.children.map((child) => (
                  <Item
                    key={child.key}
                    onClick={() => {
                      setSelectedKeys(child.key);
                      setOpenKeys(route.key);
                    }}
                  >
                    <div className='h-full pl-6 font-[500] text-base flex items-center'>
                      <Link to={child.key}>{child.label}</Link>
                    </div>
                  </Item>
                ))}
              </SubMenu>
            );
          }
          return (
            <Item
              key={route.key}
              icon={<MenuIcon icon={route.icons} isActive={!!selectedKeys.includes(route.key)} />}
              onClick={() => {
                setSelectedKeys(route.key);
                setOpenKeys('');
              }}
            >
              <Link to={route.key}>
                <div className='pl-4 font-bold text-base'>{route.label}</div>
              </Link>
            </Item>
          );
        })}
        <Divider />
        <div className='h-32 flex items-end'>
          <Item
            key='logout'
            icon={<img src={ICONS.LOGOUT_ICON} className={`${collapsed ? 'ml-3' : ''}`} alt='' />}
            className='!px-6'
          >
            <div className='pl-1.5 font-bold text-base'>Logout</div>
          </Item>
        </div>
      </Menu>
    </SideMenuBar>
  );
}
