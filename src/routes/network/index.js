import Fork from '/components/fork';
import Logo from '/components/logo';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Screen from '/components/screen';
import TextInput from '/components/text-input';

import { connect } from 'react-redux';
import styled from 'styled-components';

const STUB = () => true;

const PeerList = styled.div`
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${(props) => props.theme.space.huge} 0;
  overflow: auto;
  width: 90%;
`;

const PeerListItem = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  padding: ${(props) => props.theme.space.normal};
  margin: 0 0 ${(props) => props.theme.space.tiny};
`;

const PeerAvatar = styled.div`
  background-color: #000000;
  border-color: ${(props) => props.theme.color.action.border};
  border-radius: 50%;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 1);
  height: 48px;
  margin: ${(props) => props.theme.space.normal};
  width: 48px;
`;

const PeerSummary = styled.div`
  flex: 1;
  margin: ${(props) => props.theme.space.normal};
`;

const PeerName = styled.div`
  font-weight: 700;
  line-height: 24px;
`;

const PeerActivity = styled.div`
  font-size: 0.8em;
  line-height: 24px;
`;

const Introduction = styled.div`
  text-align: center;
`;

const NetworkRoute = ({ name }) => <Fork
  condition={Boolean(name)}
  whenFalse={() => <Redirect to="/"/>}
  whenTrue={() => <Screen>
    <Logo/>
    <Introduction>
      <p><b style={{ color: '#3090f0' }}>427</b> other people are here.</p>
      <p>Looking for someone in particular?</p>
      <TextInput isAutoFocus onChange={STUB} value=""/>
    </Introduction>
    <PeerList>
      <PeerListItem>
        <PeerAvatar/>
        <PeerSummary>
          <PeerName>Name</PeerName>
          <PeerActivity>Last seen at ...</PeerActivity>
        </PeerSummary>
      </PeerListItem>
      <PeerListItem>
        <PeerAvatar/>
        <PeerSummary>
          <PeerName>Name</PeerName>
          <PeerActivity>Last seen at ...</PeerActivity>
        </PeerSummary>
      </PeerListItem>
      <PeerListItem>
        <PeerAvatar/>
        <PeerSummary>
          <PeerName>Name</PeerName>
          <PeerActivity>Last seen at ...</PeerActivity>
        </PeerSummary>
      </PeerListItem>
    </PeerList>
  </Screen>}
/>;

const { string } = PropTypes;

NetworkRoute.propTypes = {
  name: string
};

export { NetworkRoute };

export default connect((state) => ({
  name: state.name
}))(NetworkRoute);
