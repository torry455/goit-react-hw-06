import { useId } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./ContactForm.module.css";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "User name must be at least 5 characters long!")
    .max(50, "User name must be less 100 characters long!")
    .required("Please, enter your name! This field is required!"),
  number: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{3}$/, {
      message: "Please, enter the correct phone number: 111-111-111!",
      excludeEmptyString: false,
    })
    .required("Please, enter your phone number! This field is required!"),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={css.form}>
        <div className={css.label}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            className={css.input}
            type="text"
            name="name"
            placeholder="Hwan Hyunjin"
            id={nameFieldId}
          />
          <ErrorMessage className={css.error} name="name" component="div" />
        </div>

        <div className={css.label}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field
            className={css.input}
            type="tel"
            name="number"
            placeholder="111-111-111"
            id={numberFieldId}
          />
          <ErrorMessage className={css.error} name="number" component="div" />
        </div>
        <button className={css.btn} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
