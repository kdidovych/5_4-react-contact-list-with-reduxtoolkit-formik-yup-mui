import {useDispatch, useSelector} from 'react-redux';
import ContactItem from '../ContactItem/ContactItem.jsx';
import {useEffect} from 'react';
import {getContacts} from "../../store/slices/contactsSlice.js";
import {cleanEditableContact} from "../../store/reducers/editableContactReducer.js";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ContactList() {
    const dispatch = useDispatch();

    const contacts = useSelector((state) => state.contacts.items);
    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    const cleanForm = () => {
        dispatch(cleanEditableContact());
    }
    return (
        <Stack component="section"
               direction="column"
               spacing={2}
               sx={{justifyContent: "space-between", height: "stretch", padding: '10px'}}>
            <div className="contact-list-items">
                <Stack spacing={1}>
                    {contacts.map(
                        item => <ContactItem key={'contactId-' + item.id} contact={item}/>
                    )}
                </Stack>
            </div>
            <div className='contact-list-buttons'>
                <Button variant="contained" onClick={cleanForm} size='small'>New</Button>
            </div>
        </Stack>
    );
}