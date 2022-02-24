import { actiontypes } from "../actiontypes/actiontypes";

const initalStore = {
    categories: [],
    allCategories: []
};
const todoReducer = (store = initalStore, action) => {
    switch(action.type) {
        case actiontypes.ADD: 
            return store = {
                        ...store,
                        categories: [...action.payload],
                    };
        case actiontypes.ADDALL:
            return store = {
                ...store,
                allCategories: [...action.payload]
            };
        case actiontypes.GETLOCALSER:
            return store = action.payload;
        default:
            return store;
    }
}

export default todoReducer;
