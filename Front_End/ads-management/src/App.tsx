import './App.css'
import { Footer, Header } from './components/global'
import { RouterProvider } from './routes'

function App() {
  return (

    <div className='h-[100vh]'>
      <Header />
      <RouterProvider />
      <Footer />
    </div>
  )
}

export default App
