import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes';
import { AntdConfigProvider, ReactQueryProvider } from './providers';

function App() {
  return (
    <ReactQueryProvider>
      <AntdConfigProvider>
        <RouterProvider router={router} />;
      </AntdConfigProvider>
    </ReactQueryProvider>
  );
}

export default App;
