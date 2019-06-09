import PropTypes from 'prop-types';
import React from 'react';
import { SHA3 } from 'sha3';

import styled from 'styled-components';

const Vector = styled.svg.attrs({ viewBox: '0 0 256 256' })`
  background-color: #ffffff;
  border-color: inherit;
  border-radius: 50%;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 1px #000000;
  box-sizing: border-box;
  color: #000000;
  height: 1em;
  width: 1em;
`;

const Shape = styled.path.attrs({ fill: 'currentColor' })`
`;

const rgb = (array) => {
  let r = 0;
  let g = 0;
  let b = 0;

  // eslint-disable-next-line no-magic-numbers
  for (let i = 0; i < array.length; i += 3) {
    r ^= array[i] || 0;
    g ^= array[i + 1] || 0;
    // eslint-disable-next-line no-magic-numbers
    b ^= array[i + 2] || 0;
  }

  return [r, g, b];
};

const style = (array) => {
  const [r, g, b] = rgb(array);

  const style = {
    backgroundColor: `rgba(${r}, ${g}, ${b}, 1)`,
    // eslint-disable-next-line no-magic-numbers
    color: `rgba(${0xFF - r}, ${0xFF - g}, ${0xFF - b}, 1)`
  };

  return style;
};

const path = (array) => {
  if (array.length === 0) {
    return 'M 0,0 256,0 256,256 0,256 Z';
  }

  const path = ['M'];

  // eslint-disable-next-line no-magic-numbers
  for (let i = 0; i < array.length; i += 2) {
    const x = array[i];
    const y = array[i + 1];
    path.push(`${x},${y}`);
  }

  path.push('Z');

  return path.join(' ');
};

const EMPTY = new Uint8Array();

class Hashatar extends React.Component {
  static get propTypes() {
    const { string } = PropTypes;
    return {
      code: string.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      path: path(EMPTY),
      style: style(EMPTY)
    };
  }

  componentDidMount() {
    this.handleCodeChange(this.props.code);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.code !== this.props.code) {
      this.handleCodeChange(this.props.code);
    }
  }

  handleCodeChange(code) {
    // eslint-disable-next-line no-magic-numbers
    const array = new Uint8Array(new SHA3(256).update(code).digest());
    this.setState({
      path: path(array),
      style: style(array)
    });
  }

  render() {
    const { state: { path, style } } = this;

    return <Vector style={style}>
      <Shape d={path}/>
    </Vector>;
  }
}

export default Hashatar;
