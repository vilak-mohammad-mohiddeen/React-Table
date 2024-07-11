import {Provider} from 'react-redux';
import store from './store/react-redux';
// import '../node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
import './App.css'

import { ReactTableComponent } from './components/ReactTableComponent'
import { useEffect } from 'react';

function App() {
  
  

  return (
    <Provider store={store}>

      <ReactTableComponent />
    </Provider>
  )
}

export default App
