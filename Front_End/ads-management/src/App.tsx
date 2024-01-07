import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AntdConfigProvider, ReactQueryProvider } from './providers';
import { router } from './routes';

function App() {
  return (
    <ReactQueryProvider>
      <AntdConfigProvider>
        <ToastContainer />
        <RouterProvider router={router} />;
      </AntdConfigProvider>
    </ReactQueryProvider>
  );
}

export default App;
