import { RouterProvider } from 'react-router-dom';
import './App.css';
import AntdConfigProvider from './config/antd';
import { router } from './routes';

function App() {
  return (
    <AntdConfigProvider>
      <RouterProvider router={router} />;
    </AntdConfigProvider>
  );
}

export default App;
