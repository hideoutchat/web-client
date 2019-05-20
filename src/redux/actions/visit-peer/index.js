const visitPeer = ({ history, peer }) => () => {
  history.push(`/peers/${encodeURIComponent(peer.id)}`);
};

export default visitPeer;
