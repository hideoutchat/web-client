import Dialog from '/components/dialog';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';

import { connect } from 'react-redux';
import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Content = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  margin: 0 0 ${theme('space', 'large')};
`;

const Description = styled.div`
  margin: ${theme('space', 'normal')} 0;
`;

const StyledTextInput = styled.input`
  background: none;
  border-color: ${theme('color', 'action', 'borderInactive')};
  border-style: solid;
  border-width: 0 0 2px;
  color: inherit;
  margin: 0;
  padding: ${theme('space', 'normal')};
  width: auto;

  ${(props) => props.theme.transition('border-color')}

  :active,
  :focus,
  :hover {
    border-color: ${theme('color', 'action', 'border')};
  }

  :active:hover,
  :focus:hover {
    border-color: ${theme('color', 'action', 'border')};
  }
`;

class TextInput extends React.Component {
  static get propTypes() {
    const { bool } = PropTypes;
    return {
      ...StyledTextInput.propTypes || {},
      isAutoFocus: bool
    };
  }
  handleChange = (event) => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { props: { isAutoFocus = false } } = this;
    return <StyledTextInput {...this.props} autoFocus={isAutoFocus} onChange={this.handleChange}/>;
  }
}

class GroupsDialog extends React.Component {
  static get propTypes() {
    const { arrayOf, func, shape, string } = PropTypes;

    return {
      history: shape({ goBack: func.isRequired }).isRequired,
      location: shape({
        state: shape({
          topicId: string.isRequired
        }).isRequired
      }).isRequired,
      onCommit: func.isRequired,
      peers: shape({
        default: arrayOf(shape({
          attributes: shape({
            displayName: string.isRequired
          }).isRequired,
          id: string.isRequired
        })).isRequired,
        eligible: arrayOf(shape({
          attributes: shape({
            displayName: string.isRequired
          }).isRequired,
          id: string.isRequired
        })).isRequired
      }).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      peerSelection: []
    };
  }

  handleGroupNameChange = (groupName) => this.setState({ groupName });

  handlePeerSelectionChange = (peerSelection) => {
    this.setState({ peerSelection });
  }

  render() {
    const {
      handleGroupNameChange,
      handlePeerSelectionChange,
      props: { history, onCommit, peers },
      state: { groupName, peerSelection }
    } = this;
    const options = peers.eligible.map((peer) => ({
      isSelected: peerSelection.some((it) => it.value === peer),
      label: peer.attributes.displayName,
      value: peer
    }));
    const defaults = options.filter((it) => peers.default.includes(it.value));

    return <Dialog
      commitLabel="Create"
      content={<Content>
        <Field>
          <Select
            defaultValue={defaults}
            isMulti
            onChange={handlePeerSelectionChange}
            options={options}
            placeholder="Invite others..."
            styles={{
              option: (provided, state) => ({
                ...provided,
                color: state.theme.colors.neutral70
              })
            }}
          />
          <Description>The people you select will be invited to join the group.</Description>
        </Field>
        <Field>
          <TextInput isAutoFocus onChange={handleGroupNameChange} placeholder="Name the group..." value={groupName}/>
          <Description>This group name will be visible to all invitees.</Description>
        </Field>
      </Content>}
      onCancel={() => history.goBack()}
      onCommit={onCommit}
      title="Create a group"
    />;
  }
}

export { GroupsDialog };

export default connect((state, props) => {
  const {
    indexes: {
      resources: {
        by: {
          type: {
            identity: identities,
            self: [
              {
                relationships: {
                  identity: {
                    id: selfId
                  }
                }
              }
            ],
            topicMembership: topicMemberships
          }
        }
      }
    }
  } = state;
  const { location: { state: { topicId } } } = props;
  const memberships = topicMemberships.filter((it) => it.relationships.topic.id === topicId);

  return {
    peers: identities.reduce((a, identity) => {
      if (identity.id !== selfId) {
        a.eligible.push(identity);
        if (memberships.some((it) => it.relationships.identity.id === identity.id)) {
          a.default.push(identity);
        }
      }
      return a;
    }, { default: [], eligible: [] })
  };
}, (dispatch, props) => ({
  onCommit: () => props.history.goBack()
}))(GroupsDialog);
