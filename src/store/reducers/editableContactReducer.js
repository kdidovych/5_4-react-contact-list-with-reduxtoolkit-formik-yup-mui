import {createAction, createReducer, isAnyOf} from '@reduxjs/toolkit';
import {EDITABLE_CONTACT_REDUCER, EMPTY_CONTACT} from "../../constants.js";
import {addContact, deleteContact} from "../slices/contactsSlice.js";

export const saveEditableContact = createAction(`${EDITABLE_CONTACT_REDUCER}/save`);
export const cleanEditableContact = createAction(`${EDITABLE_CONTACT_REDUCER}/clean`);

const initialState = {
    item: EMPTY_CONTACT
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(saveEditableContact, (state, action) => {
            state.item = {...action.payload};
        })
        .addCase(cleanEditableContact, (state) => {
            state.item = {...EMPTY_CONTACT};
        })
        .addMatcher(
            isAnyOf(addContact.fulfilled, deleteContact.fulfilled),
            (state) => {
                state.item = {...EMPTY_CONTACT};
            }
        );
});