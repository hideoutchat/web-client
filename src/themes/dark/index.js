const createDarkTheme = () => ({
  color: {
    action: {
      background: 'rgba(0, 32, 0, 0.1)',
      border: '#2eb460',
      foreground: '#ffffff'
    },
    primary: {
      background: '#221f27',
      border: '#505050',
      foreground: '#f0f0f0'
    }
  },
  shadow: {
    high: 'rgba(0, 0, 0, 0.5)',
    low: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.25)'
  },
  space: {
    huge: '32px',
    large: '16px',
    normal: '8px',
    small: '4px',
    tiny: '2px'
  },
  transition: (...properties) => `
    transition-duration: 100ms;
    transition-property: ${properties.join(', ')};
    transition-timing-function: ease-in-out;
  `,
  typeface: {
    normal: 'Helvetica, sans-serif'
  }
});

export default createDarkTheme;
