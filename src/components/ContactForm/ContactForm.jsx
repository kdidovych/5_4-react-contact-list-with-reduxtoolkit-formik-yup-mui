import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import './ContactForm.css';
import {addContact, updateContact, deleteContact} from "../../store/slices/contactsSlice.js";
import {Formik, Form, Field} from 'formik';
import {object, string} from 'yup';

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
        <section className="contact-form-section">
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
                         touched,
                         isSubmitting,
                         setFieldValue
                     }) => (
                        <Form className="contact-form">
                            <div className="inputs-container">
                                {errors.firstName && touched.firstName &&
                                    <span className="error-msg">{errors.firstName}</span>}
                                <label>
                                    <Field
                                        type="text"
                                        name="firstName"
                                        placeholder="FirstName"/>
                                    <span className='X' onClick={() => setFieldValue('firstName', '', false)}></span>
                                </label>
                                {errors.lastName && touched.lastName &&
                                    <span className="error-msg">{errors.lastName}</span>}
                                <label>
                                    <Field
                                        type="text"
                                        name="lastName"
                                        placeholder="LastName"/>
                                    <span className='X' onClick={() => setFieldValue('lastName', '', false)}></span>
                                </label>
                                {errors.email && touched.email && <span className="error-msg">{errors.email}</span>}
                                <label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        autoComplete="on"/>
                                    <span className='X' onClick={() => setFieldValue('email', '', false)}></span>
                                </label>
                                {errors.phone && touched.phone && <span className="error-msg">{errors.phone}</span>}
                                <label>
                                    <Field
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone"
                                        autoComplete="on"/>
                                    <span className='X' onClick={() => setFieldValue('phone', '', false)}></span>
                                </label>
                            </div>
                            <div className="form-buttons">
                                {errors.length && 'Validation error occurred'}
                                {errors.name && <div id="feedback">{errors.name}</div>}
                                <button type="submit" disabled={isSubmitting}>Save</button>
                                {contact.id
                                    ? <button type="button"
                                              onClick={() => dispatch(deleteContact(contact.id))}>Delete</button>
                                    : ""
                                }
                            </div>
                        </Form>
                    )}
            </Formik>
        </section>
    );
}