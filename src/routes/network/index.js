import styled, { keyframes } from 'styled-components';

import Fork from '/components/fork';
import Hashatar from '/components/hashatar';
import Logo from '/components/logo';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Screen from '/components/screen';
import TextInput from '/components/text-input';

import { connect } from 'react-redux';
import visitPeer from '/redux/actions/visit-peer';

const DriftIn = keyframes`
  from {
    transform: scale(0.5, 0.5) translateY(256px) skewX(10deg);
    opacity: 0;
  }

  to {
    transform: scale(1, 1) translateY(0) skewX(0deg);
    opacity: 1;
  }
`;

const PeerList = styled.div`
  align-items: stretch;
  animation-duration: 1s;
  animation-name: ${DriftIn};
  animation-timing-function: ease-in-out;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${(props) => props.theme.space.huge} 0;
  overflow: auto;
  width: 90%;
`;

const PeerListItem = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  border-color: transparent;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: ${(props) => props.theme.space.normal};
  margin: 0 0 ${(props) => props.theme.space.tiny};
  ${(props) => props.theme.transition('background-color', 'border-color', 'color')}

  :active,
  :hover {
    border-color: ${(props) => props.theme.color.action.border};
  }

  :active:hover {
    background-color: ${(props) => props.theme.color.action.border};
    color: ${(props) => props.theme.color.primary.background};
  }
`;

const PeerAvatar = styled.div`
  background-color: #000000;
  border-color: ${(props) => props.theme.color.action.border};
  border-radius: 50%;
  border-style: solid;
  border-width: 2px;
  font-size: 48px;
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
  opacity: 0.5;
`;

const Introduction = styled.div`
  text-align: center;
`;

class NetworkRoute extends React.Component {
  static get propTypes() {
    const { arrayOf, func, shape, string } = PropTypes;

    return {
      name: string,
      onPeerSelect: func.isRequired,
      peers: arrayOf(shape({
        activity: string.isRequired,
        id: string.isRequired,
        name: string.isRequired
      })).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      filteredPeers: props.peers,
      peerNameFilter: ''
    };
  }

  handlePeerNameFilterChange = (peerNameFilter) => {
    const { props: { peers } } = this;
    const normalizedFilter = peerNameFilter.toLowerCase();

    this.setState({
      filteredPeers: peers.filter((it) => it.name.toLowerCase().includes(normalizedFilter)),
      peerNameFilter
    });
  };

  render() {
    const {
      handlePeerNameFilterChange,
      props: { name, onPeerSelect },
      state: { filteredPeers, peerNameFilter }
    } = this;
    return <Fork
      condition={Boolean(name)}
      whenFalse={() => <Redirect to="/"/>}
      whenTrue={() => <Screen>
        <Logo/>
        <Introduction>
          <p><b style={{ color: '#3090f0' }}>427</b> other people are here.</p>
          <p>Looking for someone in particular?</p>
          <TextInput isAutoFocus onChange={handlePeerNameFilterChange} value={peerNameFilter}/>
        </Introduction>
        <PeerList>
          {filteredPeers.map((peer) => <PeerListItem key={peer.id} onClick={() => onPeerSelect(peer)}>
            <PeerAvatar>
              <Hashatar code={peer.id}/>
            </PeerAvatar>
            <PeerSummary>
              <PeerName>{peer.name}</PeerName>
              <PeerActivity>{peer.activity}</PeerActivity>
            </PeerSummary>
          </PeerListItem>)}
        </PeerList>
      </Screen>}
    />;
  }
}

export { NetworkRoute };

export default connect((state) => ({
  name: state.name,
  peers: state.peers
}), (dispatch, props) => ({
  onPeerSelect: (peer) => dispatch(visitPeer({ history: props.history, peer }))
}))(NetworkRoute);
