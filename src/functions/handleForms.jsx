export const handleInputsChange = (e, value, setValue) => {
  setValue({
    ...value,
    [e.target.id]: e.target.value,
  });
};

export const handleSubmitBtnsClick = (value) => {
  console.log(value);
};
