const validatePassword = (password) => {
  const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return pattern.test(password) ? true : false;
};

export default validatePassword;
