import React from "react";

const useForm = (validate, cb) => {
    const [values, setValues] = React.useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors(validate(values));
        setIsSubmitting(true);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    React.useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            cb();
        }
    }, [errors]);

    return { handleChange, values, handleSubmit, errors, isSubmitting };
};

export default useForm;
