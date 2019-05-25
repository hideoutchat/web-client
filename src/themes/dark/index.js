const createDarkTheme = () => ({
  color: {
    action: {
      background: 'rgba(0, 32, 0, 0.1)',
      border: '#2eb460',
      borderInactive: '#505050',
      foreground: '#ffffff'
    },
    primary: {
      background: '#221f27',
      bold: '#ffffff',
      border: 'rgba(0, 0, 0, 0.25)',
      foreground: '#f0f0f0',
      link: '#2eb460'
    }
  },
  gradient: {
    screen: 'linear-gradient(to bottom, #221f27 0%, #040810 100%)'
  },
  shadow: {
    high: 'rgba(0, 0, 0, 0.35)',
    low: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.25)',
    off: 'rgba(0, 0, 0, 0)'
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
    normal: '400 14px PT Sans, Helvetica, sans-serif',
    paragraph: '400 14px PT Sans, Helvetica, sans-serif',
    title: '400 14px PT Sans, Helvetica, sans-serif'
  }
});

export default createDarkTheme;
