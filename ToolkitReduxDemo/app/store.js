const configureStore =require ('@reduxjs/toolkit').configureStore
const cakeReducer = require ('../features/cake/cakeSlice')

//similar to previous
const store = configureStore ({
    reducer :{
        cake:cakeReducer
    }
})
module.exports = store 