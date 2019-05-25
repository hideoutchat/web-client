const theme = (...keys) => (props) => {
  if (!props.theme) {
    return 'initial';
  }

  let value = props.theme;
  for (const key of keys) {
    value = value && value[key];
  }
  return value;
};

export default theme;
