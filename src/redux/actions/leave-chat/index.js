const BACK = -1;
const goBack = (history) => () => history.go(BACK);

const leaveChat = ({ history }) => goBack(history);

export default leaveChat;
