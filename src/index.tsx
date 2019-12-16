import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './Main'
import Content from './component/Content'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import reducer from './redux/reducer'
import thunk from 'redux-thunk'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="route_conteiner">
        <Main />
        <Switch>
          <Route exact={true} path="/" component={Content}/>
          <Route exact={true} path="/a/:pageNum" component={Content}/>
          <Route exact={true} path="/search/:word/" component={Content}/>
          <Route exact={true} path="/search/:word/:pageNum" component={Content}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)

