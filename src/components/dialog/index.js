import Action from './action';
import Actions from './actions';
import Content from './content';
import Footer from './footer';
import Frame from './frame';
import Header from './header';
import Overlay from './overlay';
import PrimaryAction from './primary-action';
import PropTypes from 'prop-types';
import React from 'react';
import Title from './title';

const Dialog = ({ commitLabel, content, onCancel, onCommit, title }) => <Overlay onClick={onCancel}>
  <Frame onClick={(event) => event.stopPropagation()}>
    <Header>
      <Title>{title}</Title>
    </Header>
    <Content>{content}</Content>
    <Footer>
      <Actions>
        <PrimaryAction onClick={onCommit}>{commitLabel}</PrimaryAction>
        <Action onClick={onCancel}>Cancel</Action>
      </Actions>
    </Footer>
  </Frame>
</Overlay>;

const { func, node } = PropTypes;

Dialog.propTypes = {
  commitLabel: node.isRequired,
  content: node.isRequired,
  onCancel: func.isRequired,
  onCommit: func.isRequired,
  title: node.isRequired
};

export default Dialog;
