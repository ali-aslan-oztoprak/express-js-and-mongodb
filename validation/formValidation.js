module.exports.registerValidation = (username, password) => {
    const errors = [];

    if (username === '') {
        errors.push({
            message: 'Username is required',
        });
    }

    if (password === '') {
        errors.push({
            message: 'Password is required',
        });
    }

    if (password.length < 6) {
        errors.push({
            message: 'Password minimum length must be 6 characters',
        })
    }

    return errors;
};