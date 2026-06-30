import {useDispatch, useSelector} from 'react-redux';
import ContactItem from '../ContactItem/ContactItem.jsx';
import {useEffect} from 'react';
import './ContactList.css';
import {getContacts} from "../../store/slices/contactsSlice.js";
import {cleanEditableContact} from "../../store/reducers/editableContactReducer.js";

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
        <section className="contact-list-section">
            <div className="contact-list-items">
                {contacts.map(
                    item => <ContactItem key={'contactId-' + item.id} contact={item}/>
                )}
            </div>
            <div className='contact-list-buttons'>
                <button onClick={cleanForm}>New</button>
            </div>
        </section>
    );
}