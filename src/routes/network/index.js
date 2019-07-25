import Fork from '/components/fork';
import Hashatar from '/components/hashatar';
import Logo from '/components/logo';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Screen from '/components/screen';
import TextInput from '/components/text-input';

import { connect } from 'react-redux';
import styled from 'styled-components';
import theme from '/utilities/styled/theme';
import visitPeer from '/redux/actions/visit-peer';

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PeerList = styled.div`
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: column;
  font: ${theme('typeface', 'normal')};
  margin: ${theme('space', 'huge')} 0;
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
  padding: ${theme('space', 'normal')};
  margin: 0 0 ${theme('space', 'tiny')};

  ${({ theme }) => theme.transition('background-color', 'border-color', 'color')}

  :active,
  :hover {
    border-color: ${theme('color', 'action', 'border')};
  }

  :active:hover {
    background-color: ${theme('color', 'action', 'border')};
    color: ${theme('color', 'primary', 'background')};
  }
`;

const PeerAvatar = styled.div`
  background-color: #000000;
  border-radius: 50%;
  font-size: 48px;
  height: 48px;
  margin: ${theme('space', 'normal')};
  width: 48px;
`;

const PeerSummary = styled.div`
  flex: 1;
  margin: ${theme('space', 'normal')};
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
  font: ${theme('typeface', 'normal')};
  text-align: center;
`;

const Welcome = styled.div`
  font: ${theme('typeface', 'code')};
  opacity: 0.1;
`;

class NetworkRoute extends React.Component {
  static get propTypes() {
    const { arrayOf, func, number, shape, string } = PropTypes;
    const identityShape = {
      attributes: shape({
        displayName: string.isRequired
      }).isRequired,
      id: string.isRequired
    };

    return {
      onPeerSelect: func.isRequired,
      peerCount: number.isRequired,
      peers: arrayOf(shape(identityShape)).isRequired,
      self: shape(identityShape).isRequired
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
      filteredPeers: peers.filter((it) => it.attributes.displayName.toLowerCase().includes(normalizedFilter)),
      peerNameFilter
    });
  };

  render() {
    const {
      handlePeerNameFilterChange,
      props: { onPeerSelect, peerCount, self },
      state: { filteredPeers, peerNameFilter }
    } = this;
    return <Fork
      condition={Boolean(self.attributes.displayName)}
      whenFalse={() => <Redirect to="/"/>}
      whenTrue={() => <Screen>
        <Header>
          <Logo/>
          <Welcome>SElERU9VVA</Welcome>
          <Introduction>
            <p><b style={{ color: '#3090f0' }}>{peerCount}</b> other {peerCount === 1 ? 'person is' : 'people are'} here.</p>
            {peerCount > 0 && <p>Looking for someone in particular?</p>}
            {peerCount > 0 && <TextInput isAutoFocus onChange={handlePeerNameFilterChange} value={peerNameFilter}/>}
          </Introduction>
        </Header>
        <Content>
          <PeerList>
            {filteredPeers.map((peer) => <PeerListItem key={peer.id} onClick={() => onPeerSelect(peer)}>
              <PeerAvatar>
                <Hashatar code={peer.id}/>
              </PeerAvatar>
              <PeerSummary>
                <PeerName>{peer.attributes.displayName}</PeerName>
                <PeerActivity>{peer.id}</PeerActivity>
              </PeerSummary>
            </PeerListItem>)}
          </PeerList>
        </Content>
      </Screen>}
    />;
  }
}

export { NetworkRoute };

const mapStateToProps = (state) => ({
  peerCount: state.indexes.resources.by.type.identity.length - 1,
  peers: state.indexes.resources.by.type.identity.filter((it) => state.indexes.resources.by.type.self[0].relationships.identity.id !== it.id),
  self: state.indexes.resources.by.id[state.indexes.resources.by.type.self[0].relationships.identity.id][0]
});

const mapDispatchToProps = (dispatch, props) => ({
  onPeerSelect: (peer) => dispatch(visitPeer({ history: props.history, peer }))
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkRoute);
