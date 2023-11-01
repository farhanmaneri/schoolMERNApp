
import { BrowserRouter } from'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './app/store'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
  <>
  <Provider store={store}>

  <BrowserRouter>
  <AppRoutes/>
  </BrowserRouter>
  </Provider>
  </>
    )
}
// kkkkkk

export default App;