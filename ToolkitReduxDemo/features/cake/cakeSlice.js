const createSlice = require ('@reduxjs/toolkit').createSlice

const initialState ={
    numOfCakes:10
}
const cakeSlice = createSlice({
    name:'cake',
    initialState, // same as => initialState:initialState
    reducers:{
        ordered:(state)=>{
            // we don't have to explisitly written the state and too we can directly mutate the state
            state.numOfCakes-- // this is possible because create slice under the hood uses immer library,redux toolkit handles the state updation on our behalf
        },
        restocked :(state,action)=>{
            state.numOfCakes += action.payload
            //que : what about actions?
            // ans : createSlice will automatically generate action creator with the same name as the reducer function as we have written       }
    },
},
})
module.exports =cakeSlice.reducer
module.exports.cakeActions =cakeSlice.actions

//here this slice afectively takes care of defining an action type constant, action object, action creator,Switch statement in reducers and handling the mutable updates in the reducer