import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/contact-service.js";
import {CONTACTS_STORAGE_NAME, CONTACT_SLICE_NAME} from "../../constants.js";

export const getContacts = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/getContacts`,
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get(CONTACTS_STORAGE_NAME)
            if (response.status >= 400) {
                rejectWithValue(`Getting contacts error. Status ${response.status}`);
            }
            return response.data;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);
export const addContact = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/addContact`,
    async (contact, {rejectWithValue}) => {
        try {
            const response = await api.post(CONTACTS_STORAGE_NAME, contact)
            if (response.status >= 400) {
                rejectWithValue(`Adding contact error. Status ${response.status}`);
            }
            return response.data;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);
export const updateContact = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/updateContact`,
    async (contact, {rejectWithValue}) => {
        try {
            const response = await api.put(`${CONTACTS_STORAGE_NAME}/${contact.id}`, contact);
            if (response.status >= 400) {
                rejectWithValue(`Updating contact id ${contact.id} error. Status ${response.status}`);
            }
            return response.data;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);
export const deleteContact = createAsyncThunk(
    `${CONTACT_SLICE_NAME}/deleteContact`,
    async (id, {rejectWithValue}) => {
        try {
            const response = await api.delete(`${CONTACTS_STORAGE_NAME}/${id}`);
            if (response.status >= 400) {
                rejectWithValue(`Deleting contact id ${id} error. Status ${response.status}`);
            }
            return id;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
}
const setFetching = (state) => {
    state.isFetching = true;
    state.error = null;
}

const contactSlice = createSlice({
    name: CONTACT_SLICE_NAME,
    initialState: {
        items: [],
        isFetching: false,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getContacts.pending, setFetching);
        builder.addCase(getContacts.rejected, setError);
        builder.addCase(getContacts.fulfilled, (state, {payload}) => {
            state.items = payload;
            state.isFetching = false;
        });
        builder.addCase(addContact.pending, setFetching);
        builder.addCase(addContact.rejected, setError);
        builder.addCase(addContact.fulfilled, (state, {payload}) => {
            state.items.push(payload);
            state.isFetching = false;
        });
        builder.addCase(updateContact.pending, setFetching);
        builder.addCase(updateContact.rejected, setError);
        builder.addCase(updateContact.fulfilled, (state, {payload}) => {
            state.items = state.items.map((item) => item.id === payload.id ? payload : item);
            state.isFetching = false;
        });
        builder.addCase(deleteContact.pending, setFetching);
        builder.addCase(deleteContact.rejected, setError);
        builder.addCase(deleteContact.fulfilled, (state, {payload}) => {
            state.items = state.items.filter(({id}) => id !== payload);
            state.isFetching = false;
        });
    }
});

export default contactSlice.reducer;