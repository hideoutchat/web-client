import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const StyledPanel = styled.div`
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;

const Content = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const Footer = styled.div`
  border-color: ${theme('color', 'primary', 'border')};
  border-style: solid;
  border-width: 1px 0 0;
  display: block;
  transition-duration: 100ms;
  transition-property: background-color, color;
  transition-timing-function: ease-in-out;
`;

const Header = styled.div`
  border-color: ${theme('color', 'primary', 'border')};
  border-style: solid;
  border-width: 0 0 1px;
  display: block;
  transition-duration: 100ms;
  transition-property: background-color, color;
  transition-timing-function: ease-in-out;
`;

const Panel = ({ content, footer, header }) => <StyledPanel>
  {header && <Header>{header}</Header>}
  <Content>{content}</Content>
  {footer && <Footer>{footer}</Footer>}
</StyledPanel>;

const { node } = PropTypes;

Panel.propTypes = {
  content: node.isRequired,
  footer: node,
  header: node
};

export default Panel;
