const store =require ('./app/store') //importing store
const cakeActions =require ('./features/cake/cakeSlice').cakeActions
const icecreamActions = require ('./features/icecream/icecreamSlice').icecreamActions

console.log('Initial state',store.getState()) //logining initial state,similar to plain redux

const unsubscribe =store.subscribe (()=>{
    console.log('Updated state ',store.getState())
})

//Dispatch the few actions here 
store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.ordered())
store.dispatch(cakeActions.restocked(3))

store.dispatch(icecreamActions.ordered())
store.dispatch(icecreamActions.ordered())
store.dispatch(icecreamActions.restocked(2))


unsubscribe()