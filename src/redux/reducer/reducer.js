import { actiontypes } from "../actiontypes/actiontypes";

const initalStore = {
    categories: [{key: 1, nomi: "Laptop", no: 1}],
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
        default:
            return store;
    }
}

export default todoReducer;
