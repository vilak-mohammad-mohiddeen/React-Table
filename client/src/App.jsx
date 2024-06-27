import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { RootComponent } from './pages/RootComponent';
import ReactTableComponent from './components/ReactTableComponent';
import { SignupComponent } from './pages/SignupComponent';
import { HomeComponent } from './pages/HomeComponent';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import { ErrorPage } from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootComponent />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomeComponent />
      },
      {
        path: 'table',
        element: <ReactTableComponent />
      },
      {
        path: 'signup',
        element: <SignupComponent />
      }
    ]
  }

]);

function App() {


  return (
    // <ReactTableComponent></ReactTableComponent>
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App
