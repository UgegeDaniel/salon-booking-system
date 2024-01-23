import validator from "validator";

const isValidUserDetails = (email, password) => {
  const { isStrongPassword, isEmail } = validator;
  const validEmail = isEmail(email);
  const validPassword = isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
  if (!validPassword) {
    return {
      status: false,
      message: `Password Should contain the following: 
          capital letters,
          small letters,
          number,
          special character
          and must be 8 characters long`,
    };
  }
  if (!validEmail) {
    return {
      status: false,
      message: `please provide a valid email`,
    };
  }
  if (validEmail && validPassword) {
    return {
      status: true,
      message: `valid password and email`,
    };
  }
};

export default isValidUserDetails;
