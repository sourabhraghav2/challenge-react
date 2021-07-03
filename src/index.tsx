import App from 'App'
import { store } from 'modules/stores'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux' 

ReactDom.render(
    (<Provider store={store}>
        <App />
    </Provider>
    ),
    document.getElementById('root')
)
