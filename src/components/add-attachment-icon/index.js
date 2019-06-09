import React from 'react';

import styled from 'styled-components';

const Vector = styled.svg.attrs({ fill: 'currentColor', viewBox: '0 0 256 256' })`
  height: 1em;
  margin: auto;
  width: 1em;
`;

const AddAttachmentIcon = () => <Vector>
  <rect height="244" width="16" x="120" y="4"/>
  <rect height="16" width="124" x="4" y="120"/>
  <rect height="16" width="124" x="136" y="120"/>
</Vector>;

export default AddAttachmentIcon;
