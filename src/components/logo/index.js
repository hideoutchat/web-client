import styled, { keyframes } from 'styled-components';

import React from 'react';

const Energy = keyframes`
  from {
    stroke: ${(props) => props.theme.color.action.border};
  }

  to {
    stroke: #3090f0;
  }
`;

const Vector = styled.svg.attrs({ viewBox: '0 0 96 96' })`
  stroke-width: 4;
  height: 96px;
  margin: ${(props) => props.theme.space.normal};
  width: 96px;
`;

const Dot = styled.rect.attrs({ height: 16, width: 16 })`
  stroke: none;
  fill: ${(props) => props.theme.color.primary.foreground};
`;

const Dash = styled.path`
  animation-name: ${Energy};
  animation-direction: alternate;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  fill: none;
  stroke: ${(props) => props.theme.color.action.border};
  stroke-width: 4;
`;

const Logo = () => <Vector>
  <Dash d="m 16,16 v 64 v -32 h 64 v 32"/>
  <Dot x="8" y="8"/>
  <Dot x="8" y="40"/>
  <Dot x="40" y="40"/>
  <Dot x="72" y="40"/>
  <Dot x="72" y="72"/>
  <Dot x="8" y="72"/>
</Vector>;

export default Logo;
