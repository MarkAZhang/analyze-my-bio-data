import {BrowserRouter} from 'react-router-dom'

import Header from './Header'
import routes from './routes'
import cs from './app.css'

const App = () => (
  <BrowserRouter className={cs.app}>
    <div>
      <Header />
      {routes}
    </div>
  </BrowserRouter>
)

export default App
