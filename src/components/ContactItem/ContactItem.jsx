import './ContactItem.css';
import {useDispatch} from 'react-redux';
import {deleteContact} from "../../store/slices/contactsSlice.js";
import {saveEditableContact} from "../../store/reducers/editableContactReducer.js";

function ContactItem({contact}) {
    const dispatch = useDispatch();
    const onContactDelete = () => {
        dispatch(deleteContact(contact.id));
    };
    const onDoubleClick = () => {
        dispatch(saveEditableContact(contact));
    };

    return (
        <div className="contact" onDoubleClick={onDoubleClick}>
            {`${contact.firstName} ${contact.lastName}`}
            <span className="X" onClick={onContactDelete}></span>
        </div>
    );
}

export default ContactItem;