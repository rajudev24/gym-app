import { RouterProvider } from 'react-router-dom';
import './App.css'
import { router } from './Routes/Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className='w-full'>
      <Toaster
        position="top-right"
        reverseOrder={false}
        duration={4000} />

      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  )
}

export default App
