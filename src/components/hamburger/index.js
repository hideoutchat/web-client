import React from 'react';

import styled from 'styled-components';

const Vector = styled.svg.attrs({ fill: 'currentColor', viewBox: '0 0 256 256' })`
  height: 1em;
  width: 1em;
`;

const Bar = styled.rect.attrs({ height: '32', width: '256', x: '0' })``;

const Hamburger = () => <Vector>
  <Bar y="32"/>
  <Bar y="128"/>
  <Bar y="224"/>
</Vector>;

export default Hamburger;
