import { ConfigProvider } from 'antd';

const AntdConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5599D6',
          fontFamily: 'Inter, sans-serif',
          borderRadius: 5,
        },
        components: {},
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
