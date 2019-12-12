import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Main from './Main'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import reducer from './redux/reducer'
import 'bootstrap/dist/css/bootstrap.min.css'



const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path="/" component={Main}/>
            <Route exact path="/home/:pageNum" component={Main}/>
            <Route exact path="/home/:word/:pageNum" component={Main}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
)

