import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {addContact, updateContact, deleteContact} from "../../store/slices/contactsSlice.js";
import {Formik, Form} from 'formik';
import {object, string} from 'yup';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import {deleteIcon, deleteIconButton, textField} from '../../styles';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

export default function ContactForm() {
    const contact = useSelector(state => state.editableContact.item);
    useEffect(() => {
    }, [contact]);
    const dispatch = useDispatch();
    let contactSchema = object({
        firstName: string().required('First Name is required'),
        lastName: string().required('Last Name is required'),
        email: string().email('Invalid email format').required('Email is required'),
        phone: string()
            .matches(/^(\+\d{12})|(\d{10})$/, 'Phone number must be "+{12digits}" or "{10digits}"')
    });
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email,
                phone: contact.phone,
            }}
            onSubmit={async (values, actions) => {
                const updatedContact = {...contact, ...values}
                if (contact.id) {
                    dispatch(updateContact(updatedContact));
                } else {
                    dispatch(addContact(updatedContact));
                }
                actions.setSubmitting(false);
            }}
            validate={values => {
                const errors = {};
                try {
                    contactSchema.validateSync(values, {abortEarly: false});
                } catch (error) {
                    error.inner.forEach(err => {
                        errors[err.path] = err.message;
                    })
                }
                return errors;
            }}
        >
            {
                ({
                     errors,
                     isSubmitting,
                     setFieldValue,
                     values,
                     handleChange,
                     handleBlur,
                 }) => (
                    <Form className="contact-form" style={{height: '100%'}}>
                        <Stack spacing={3} sx={{justifyContent: "space-between", padding: "10px", height: "stretch"}}>
                            <Container className="inputs-container" disableGutters={true}>
                                <Stack spacing={2}>
                                    <FormControl size="small" variant="outlined">
                                        <TextField
                                            type="text"
                                            name="firstName"
                                            label="FirstName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.firstName}
                                            variant="outlined"
                                            slotProps={{
                                                inputLabel: {
                                                    sx: textField,
                                                },
                                                input: {
                                                    sx: textField,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton aria-label="delete"
                                                                        size='small'
                                                                        sx={deleteIconButton}
                                                                        onClick={() => setFieldValue('firstName', '', false)}
                                                            >
                                                                <CloseIcon style={deleteIcon}/>
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            helperText={errors.firstName}
                                            sx={textField}
                                        />
                                    </FormControl>
                                    <FormControl size="small" variant="outlined">
                                        <TextField
                                            type="text"
                                            name="lastName"
                                            label="LastName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.lastName}
                                            variant="outlined"
                                            slotProps={{
                                                inputLabel: {
                                                    sx: textField,
                                                },
                                                input: {
                                                    sx: textField,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton aria-label="delete"
                                                                        size='small'
                                                                        sx={deleteIconButton}
                                                                        onClick={() => setFieldValue('lastName', '', false)}
                                                            >
                                                                <CloseIcon style={deleteIcon}/>
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            helperText={errors.lastName}
                                            sx={textField}
                                        />
                                    </FormControl>
                                    <FormControl size="small" variant="outlined">
                                        <TextField
                                            type="email"
                                            name="email"
                                            label="Email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            variant="outlined"
                                            fullWidth
                                            slotProps={{
                                                inputLabel: {
                                                    sx: textField,
                                                },
                                                input: {
                                                    sx: textField,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton aria-label="delete"
                                                                        size='small'
                                                                        sx={deleteIconButton}
                                                                        onClick={() => setFieldValue('email', '', false)}
                                                            >
                                                                <CloseIcon style={deleteIcon}/>
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            helperText={errors.email}
                                        />
                                    </FormControl>
                                    <FormControl size="small" variant="outlined">
                                        <TextField
                                            type="tel"
                                            name="phone"
                                            label="Phone"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phone}
                                            variant="outlined"
                                            slotProps={{
                                                inputHtml: {
                                                    sx: textField,
                                                },
                                                inputLabel: {
                                                    sx: textField,
                                                },
                                                input: {
                                                    sx: textField,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton aria-label="delete"
                                                                        size='small'
                                                                        sx={deleteIconButton}
                                                                        onClick={() => setFieldValue('phone', '', false)}
                                                            >
                                                                <CloseIcon style={deleteIcon}/>
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            helperText={errors.phone}
                                        />
                                    </FormControl>
                                </Stack>
                            </Container>
                            <Container className="form-buttons" disableGutters={true}>
                                <Grid container sx={{justifyContent: 'space-between'}}>
                                    <Grid>
                                        <Button type="submit" variant="contained" disabled={isSubmitting} size='small'>
                                            Save
                                        </Button>
                                    </Grid>
                                    {contact.id
                                        ? <Grid><Button type="button"
                                                        variant="contained"
                                                        size='small'
                                                        onClick={() => dispatch(deleteContact(contact.id))}>Delete</Button></Grid>
                                        : ""
                                    }
                                </Grid>
                            </Container>
                        </Stack>
                    </Form>
                )}
        </Formik>
    );
}