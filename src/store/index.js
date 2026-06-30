import {configureStore} from '@reduxjs/toolkit';
import {logger} from "redux-logger/src/index.js";
import contactsReducer from './slices/contactsSlice.js'
import editableContactReducer from "./reducers/editableContactReducer.js";

export default configureStore({
    reducer: {
        contacts: contactsReducer,
        editableContact: editableContactReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});