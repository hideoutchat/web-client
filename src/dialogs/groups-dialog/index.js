import Dialog from '/components/dialog';
import PropTypes from 'prop-types';
import React from 'react';
import TextInput from '/components/text-input';

import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Content = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;

const Introduction = styled.div`
  margin-bottom: ${theme('space', 'normal')};
`;

const UsersPicker = styled.div`
  padding: ${theme('space', 'normal')} 0;
`;

const UsersPickerChoice = styled.div`
  background-color: ${theme('highlight', 'low')};
  border-radius: ${theme('space', 'normal')};
  display: inline-block;
  margin: 0 ${theme('space', 'normal')} ${theme('space', 'normal')} 0;
  padding: ${theme('space', 'normal')};
`;

const UsersPickerSearch = styled(TextInput)`
  font-size: inherit;
  margin: 0;
  padding: ${theme('space', 'small')};
  width: auto;
`;

const GroupsDialog = ({ history }) => <Dialog
  commitLabel="Create"
  content={<Content>
    <Introduction>Start a new conversation with...</Introduction>
    <UsersPicker>
      <UsersPickerChoice>You</UsersPickerChoice>
      <UsersPickerChoice>fleeting spineherd</UsersPickerChoice>
    </UsersPicker>
    <UsersPickerSearch isAutoFocus placeholder="Invite others..."/>
  </Content>}
  onCancel={() => history.goBack()}
  onCommit={() => history.goBack()}
  title="Create a group"
/>;

const { func, shape } = PropTypes;

GroupsDialog.propTypes = {
  history: shape({ goBack: func.isRequired }).isRequired,
  onCommit: func.isRequired
};

export default GroupsDialog;