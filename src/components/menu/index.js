import MenuIcon from '/components/menu-icon';
import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';
import theme from '/utilities/styled/theme';
import whenProp from '/utilities/styled/when-prop';

const StyledMenu = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  margin-left: ${theme('space', 'normal')};
  opacity: ${whenProp('isEmpty')('0.5', '1')};
  pointer-events: ${whenProp('isEmpty')('none', 'auto')};
`;

const Trigger = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  ${whenProp('isActive')('opacity: 1 !important;')}
`;

const Icon = styled.svg`
  height: 1em;
  margin: auto;
  width: 1em;
`;

const Overflow = styled.div`
  pointer-events: ${whenProp('isActive')('auto', 'none')};
  position: relative;
  z-index: ${whenProp('isActive')('2', '-1')};
`;

const Anchor = styled.svg`
  fill: ${theme('color', 'primary', 'background')};
  height: 4px;
  opacity: ${whenProp('isActive')('1', '0')};
  position: absolute;
  right: 8px;
  top: -4px;
  transform: translateY(${whenProp('isActive')('0', '-16px')});
  transition-duration: 100ms;
  transition-property: opacity, transform;
  transition-timing-function: ease-in-out;
  width: 8px;
  z-index: ${whenProp('isActive')('0', '-1')};
`;

const Content = styled.div`
  align-items: stretch;
  background-color: ${theme('color', 'primary', 'background')};
  border-color: ${theme('color', 'primary', 'background')};
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  color: ${theme('color', 'primary', 'foreground')};
  display: flex;
  flex-direction: column;
  min-width: 150px;
  opacity: ${whenProp('isActive')('1', '0')};
  position: absolute;
  right: 4px;
  top: 0;
  transform: translateY(${whenProp('isActive')('0', '-16px')});
  transition-duration: 100ms;
  transition-property: opacity, transform;
  transition-timing-function: ease-in-out;
  z-index: ${whenProp('isActive')('0', '-1')};
`;

class Menu extends React.Component {
  static get defaultProps() {
    return {
      callToAction: <MenuIcon>
        <Icon fill="currentColor" viewBox="0 0 256 256">
          <circle cx="128" cy="32" r="32"/>
          <circle cx="128" cy="128" r="32"/>
          <circle cx="128" cy="224" r="32"/>
        </Icon>
      </MenuIcon>
    };
  }
  static get propTypes() {
    return {
      callToAction: PropTypes.node.isRequired,
      children: PropTypes.node
    };
  }

  constructor(props) {
    super(props);
    this.callToActionElement = React.createRef();
    this.state = {
      isActive: false
    };
  }

  componentWillUnmount() {
    this.removeDocumentClickListener();
  }

  addDocumentClickListener = () => {
    try {
      // Cache the document to which we're adding an event listener so we can remove it later.
      this.document = this.callToActionElement.current.ownerDocument.documentElement;

      // Add the click listener.
      this.document.addEventListener('click', this.handleDocumentClick, false);
    } catch (ignore) {
      // This can happen if we're not rendered right now, and that's okay.
    }
  };

  removeDocumentClickListener = () => {
    if (this.document) {
      this.document.removeEventListener('click', this.handleDocumentClick, false);
      delete this.document;
    }
  };

  handleActiveChange = () => {
    const { state: { isActive: wasActive } } = this;
    const isActive = !wasActive;
    if (isActive) {
      this.addDocumentClickListener();
    } else {
      this.removeDocumentClickListener();
    }
    this.setState({ isActive });
  };

  handleDocumentClick = (event) => {
    if (!this.state.isActive) {
      // Ignore clicks while the menu is inactive.
      return true;
    }

    if (this.callToActionElement.current.contains(event.target)) {
      // Let the default behavior for the call-to-action occur, hiding the menu.
      return true;
    }

    this.setState({ isActive: false });

    return true;
  };

  render() {
    const {
      props: { callToAction, children },
      state: { isActive }
    } = this;

    return <StyledMenu isEmpty={!React.Children.toArray(children).some(Boolean)}>
      <Trigger isActive={isActive} onClick={this.handleActiveChange} ref={this.callToActionElement}>
        {callToAction}
      </Trigger>
      <Overflow isActive={isActive}>
        <Content isActive={isActive}>
          <Anchor isActive={isActive} viewBox="0 0 8 4">
            <path d="M 4,0 L 8,4 h -8 z"/>
          </Anchor>
          {children}
        </Content>
      </Overflow>
    </StyledMenu>;
  }
}

export { Trigger };

export default Menu;
