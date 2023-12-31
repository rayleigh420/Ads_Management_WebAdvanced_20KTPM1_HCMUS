import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AntdConfigProvider, ReactQueryProvider } from './providers';
import { router } from './routes';

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
