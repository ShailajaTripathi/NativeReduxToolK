const redux = require("redux");
const createStore = redux.createStore;
//(Alternative of step:6) : Importing the helper function
const bindActionCreators = redux.bindActionCreators;
 //For Combining Multiple Reducers 
const combineReducers = redux.combineReducers;

//Middleware in 3 steps only

//Step:1 to import required middle ware here
const applyMiddleware = redux.applyMiddleware
const reduxLogger =require ("redux-logger")
const logger  =reduxLogger.createLogger()

//Step 2: Pass this middleware to store :  refer line 154
//Step 3: Add empty {} so logger middleware can handle : refer line 162


// Action :The first step for redux
// Action is an object with a type property
// Action creator is a function that returns an object

//--- Step 1: Defining actions type below
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED"; //defining action type as string
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED ";

//--- Step 2: Creating action
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}
function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    quantity: qty,
  };
}

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}
//--- Step:3 Creating State to store initial state

// const initialState = {
//   numofCakes: 10,
//   numofIcecreams: 20,
// };

//--- Step:3 (For using multiple reducer)

const initalCakeState ={
  numofCakes :10
}
const initalIceCreamState ={
  numofIcecreams:20
}


//(previousState,action) =>newState

//--- Step 4:Creating Reducer: It will handle above actions here

// const reducer = (state = initalState, action) => {
//   switch (action.type) {
//     case CAKE_ORDERED:
//       return {
//         ...state,
//         numofCakes: state.numofCakes - 1,
//       };
//     case CAKE_RESTOCKED: //
//       return {
//         ...state,
//         numofCakes: state.numofCakes + action.quantity,
//       };
//       case ICECREAM_ORDERED: //for ordering icecreams
//       return {
//         ...state,
//         numofIcecreams: state.numofIcecreams - 1,
//       };
//     case ICECREAM_RESTOCKED: //for restocking icecreams
//       return {
//         ...state,
//         numofIcecreams: state.numofIcecreams + action.payload,
//       };
//     default:
//       return state;
//   }
// };

   // Creating Multiple Reducer (split them into individual reducer)

// 1.For Cake 
const cakeReducer = (state = initalCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numofCakes: state.numofCakes - 1,
      };
    case CAKE_RESTOCKED: //
      return {
        ...state,
        numofCakes: state.numofCakes + action.quantity,
      };
    default:
      return state;
  }
};

// 2.For IceCream
const iceCreamReducer = (state = initalIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED: //for ordering icecreams
      return {
        ...state,
        numofIcecreams: state.numofIcecreams - 1,
      };
    case ICECREAM_RESTOCKED: //for restocking icecreams
      return {
        ...state,
        numofIcecreams: state.numofIcecreams + action.payload,
      };
    default:
      return state;
  }
};

//--- Step 5: Creating Store to store reducer in it
//const store = createStore(reducer);

       //-------- For Combining MULTIPLE REDUCER ----------------//
         // 5.1 here each object corresponds to the reducer
         
const rootReducer = combineReducers({
  cake:cakeReducer,
  iceCream:iceCreamReducer,
})
        // 5.2 Now pass only the rootReducer here 
const store = createStore(rootReducer, applyMiddleware(logger)) //M we can pass here as many as middleware as required

console.log("Initial state", store.getState());

//--- Step 6: Creating Store to store reducer in it
const unsubscribe = store.subscribe(() =>  {});
  //console.log("update state", store.getState())

  //M we have logger middleware to handle this function here


//--- Step 7: Invoking Dispatch on the store by passing the action ----//

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(2));

// Alternative of above steps:

//--- Step 7.1: Binding actions inside helper function and passing object data in it;---//
// first argument: is an object here we specify different action functions(action creators)
// second argument : is what we bind it to(that would we store.dispatch)

const actions = bindActionCreators({ orderCake, restockCake,orderIcecream,restockIcecream }, store.dispatch);

//---Step 7.2: Now to dispatch the action we can call like---//

actions.orderCake();
actions.orderCake();
actions.restockCake(2);

actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(2);

unsubscribe();
