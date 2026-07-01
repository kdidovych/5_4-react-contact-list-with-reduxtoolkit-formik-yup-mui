import {useDispatch} from 'react-redux';
import {deleteContact} from "../../store/slices/contactsSlice.js";
import {saveEditableContact} from "../../store/reducers/editableContactReducer.js";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {deleteIcon, gridBorder, deleteIconButton, contactItem} from '../../styles'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function ContactItem({contact}) {
    const dispatch = useDispatch();
    const onContactDelete = () => {
        dispatch(deleteContact(contact.id));
    };
    const onDoubleClick = () => {
        dispatch(saveEditableContact(contact));
    };
    return (
        <Grid container sx={{alignItems: 'center', ...gridBorder}}>
            <Grid size="grow" onDoubleClick={onDoubleClick} sx={contactItem}>
                <Box component="span">
                    {`${contact.firstName} ${contact.lastName}`}
                </Box>
            </Grid>
            <Grid>
                <IconButton aria-label="delete" onClick={onContactDelete} size='small'
                            sx={deleteIconButton}>
                    <CloseIcon style={deleteIcon}/>
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default ContactItem;