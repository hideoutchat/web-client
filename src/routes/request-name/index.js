import Form from './form';
import Logo from '/components/logo';
import PropTypes from 'prop-types';
import React from 'react';
import Screen from '/components/screen';

import { connect } from 'react-redux';
import setName from '/redux/actions/set-name';
import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Welcome = styled.div`
  font: ${theme('typeface', 'code')};
  opacity: 0.1;
`;

const RequestNameRoute = ({ onCommit }) => <Screen>
  <Header>
    <Logo/>
    <Welcome>48:49:44:45:4f:55:54</Welcome>
  </Header>
  <Form onCommit={onCommit}/>
</Screen>;

const { func } = PropTypes;

RequestNameRoute.propTypes = {
  onCommit: func.isRequired
};

export { RequestNameRoute };

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, props) => ({
  onCommit: ({ name }) => dispatch(setName({ history: props.history, name }))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestNameRoute);
