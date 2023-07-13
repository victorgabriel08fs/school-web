import { useState } from "react";

const useFormValidation = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    setIsSubmitting(false);
  };

  const handleChangeCheckBox = (name, arr) => {
    setValues({
      ...values,
      [name]: arr
    })
  }

  const handleSubmit = (event, action) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    action();
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleChangeCheckBox,
    handleSubmit,
  };
};


export default useFormValidation;
