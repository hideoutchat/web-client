import styled from 'styled-components';

const Screen = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.color.primary.background};
  background: ${(props) => props.theme.gradient.screen};
  color: ${(props) => props.theme.color.primary.foreground};
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: ${(props) => props.theme.typeface.normal};
  overflow: hidden;
  padding: ${(props) => props.theme.space.large};
`;

export default Screen;
