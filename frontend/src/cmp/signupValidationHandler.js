const signupValidationHandler = errors => {
    let validations = {};
    Object.keys(errors).map(key => {
        const error = errors[key];
        const field = errors[key]['field'];
        if (errors[key].detail.includes("Please")) {
            return (validations[field] = error['detail']);
        }
        else if (field === 'password' && errors[key].detail === "can't be blank") {
            return (validations[field] = "Please Enter Password");
        }
        else {
            return (validations[field] =
                errors[key]['field_label'] + ' ' + error['detail']);
        }
    });
    return validations;
};
export default signupValidationHandler;
