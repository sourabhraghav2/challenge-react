
import {Action} from 'modules/types' 
import {combineReducers} from 'redux'
import {createStore} from 'redux' 

const initState={
    donate: 0,
    message: '',
  }

const  userStore=(state = initState, action:Action)=>{ 
   
    switch (action.type) {
        case 'UPDATE_TOTAL_DONATE':
          return Object.assign({}, initState, {
            donate: initState.donate + action.amount,
          });
        case 'UPDATE_MESSAGE':
          return Object.assign({}, initState, {
            message: action.message,
          });
    
        default:
          return initState;
      }
}

export const store = createStore(
    combineReducers({userStore:userStore})
)