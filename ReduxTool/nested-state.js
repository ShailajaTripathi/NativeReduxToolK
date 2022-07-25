const redux = require("redux");
const produce = require("immer").produce;
 
//Suppose we want to change 'street' only in below data.(which comes under nested state) 
// This can be done easily by immer here.

const initialState = {
  name: "Krishna",
  address: {
    street: "Kunj Gali,Braj",
    city: "Mathura",
    state: "UP",
  },
};

//Step:1 Define the constant for action.

const STREET_UPDATED = "STREET UPDATED";

//Step:2 Define Action creator which returns the action object

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED, //const we seted
    payload: street, //passed in parameter
  };
};

//Step:3 Create Reducer to handle action
const reducer = (state = initialState, action) => {
  //  handle action type with the help of switch statement
  switch (action.type )
  {
    case STREET_UPDATED:
         //  from here we have to keep track of state each time
          // We can use immer in place of this.

      //    return {
      //             ...state,   //by spreading the current state,here the state will be uneffected
      //             address:{
      //                 ...state.address, //only address will be updated
      //                 street: action.payload, //state updated according to the payload(street passed in above)
      //             },
      //         }

      // }

      ///  Using Immer for maintaining nested state
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });

    default: {
      return state; //returns state as it is
    }
  }
};

//step:4 Create the store
const store = redux.createStore(reducer);
console.log("Initial State ", store.getState());

//step:5 Subscribe to the store
const unsubscribe = store.subscribe(() => {
  console.log("Updated State ", store.getState());
});

//step:6 Dispatch action to update street 
store.dispatch(updateStreet("Daan Gali,Braj"));

unsubscribe();
