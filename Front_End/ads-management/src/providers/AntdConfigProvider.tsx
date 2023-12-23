import { ConfigProvider } from 'antd';

export default function AntdConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5599D6',
          fontFamily: 'Inter, sans-serif',
          borderRadius: 5,
        },
        components: {
          Layout: {
            headerBg: '#5599D6',
            headerHeight: 60,
            siderBg: '#fff',
            headerPadding: '4px 32px',
          },
          Button: {
            borderRadius: 5,
            defaultColor: '#5599D6',
            defaultBorderColor: '#5599D6',
            defaultBg: '#fff',
          },
          Menu: {
            subMenuItemBg: '#fff',
            itemHoverBg: '#fff',
            itemHoverColor: '#5599D6',
            itemSelectedBg: '#fff',
            itemSelectedColor: '#5599D6',
            groupTitleFontSize: 16,
            itemHeight: 48,
            itemMarginBlock: 8,
            collapsedWidth: 138,
          },
          Form: {
            labelColor: '#7D7D7D',
            itemMarginBottom: 0,
          },
          // Input: {
          //   borderRadius: 5,
          //   fontSize: 16,
          //   // controlHeight: 40,
          // },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
