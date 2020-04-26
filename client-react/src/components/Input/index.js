import React from 'react';

const Input = ({ type = 'text', value, setValue, ...props }) => {
  const handleChange = (event) => setValue(event.target.value);

  return <input type={type} value={value} onChange={handleChange} {...props} />;
};

export default Input;
