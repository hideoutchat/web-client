const index = (records = []) => ({
  by: (...properties) => ({
    by: properties.reduce((propertyGroup, property) => ({
      ...propertyGroup,
      [property]: records.reduce((valueGroup, record) => ({
        ...valueGroup,
        [record[property]]: [
          ...valueGroup[record[property]] || [],
          record
        ]
      }), {})
    }), {})
  })
});

const createIndexers = () => (state) => ({
  ...state,
  indexes: {
    resources: index(state.resources).by('id', 'type')
  }
});

export default createIndexers;
