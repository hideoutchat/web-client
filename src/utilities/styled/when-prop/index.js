const whenProp = (propName) => (whenTrue, otherwise) => (props) => {
  if (props[propName]) {
    return whenTrue;
  }

  return otherwise;
};

export default whenProp;
