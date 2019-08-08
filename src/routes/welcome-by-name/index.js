import styled, { keyframes } from 'styled-components';

import Fork from '/components/fork';
import Logo from '/components/logo';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Screen from '/components/screen';
import Select from 'react-select';

import { connect } from 'react-redux';
import joinNetwork from '/redux/actions/join-network';
import theme from '/utilities/styled/theme';

const Door = styled.div`
  cursor: pointer;
  font-size: 128px;
  margin: 0;
  padding: 0;
  text-align: center;
  transform: scale(0.9, 0.9);
  ${(props) => props.theme.transition('transform')}

  :hover {
    transform: scale(1, 1);
  }
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Message = styled.div`
  align-items: stretch;
  animation-duration: 1s;
  animation-name: ${FadeIn};
  background-color: ${theme('highlight', 'low')};
  border-radius: ${theme('space', 'normal')};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: ${theme('space', 'normal')};
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 ${theme('space', 'large')};
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  font: ${theme('typeface', 'normal')};
  padding: ${theme('space', 'large')};
`;

const Welcome = styled.div`
  font: ${theme('typeface', 'code')};
  opacity: 0.1;
`;

const Network = styled.div`
  font: ${theme('typeface', 'normal')};
  margin: ${theme('space', 'large')};
  opacity: 0.1;
  padding: ${theme('space', 'large')};

  ${({ theme }) => theme.transition('opacity')}

  :hover {
    opacity: 1;
  }
`;

const Label = styled.div`
  padding: ${theme('space', 'normal')} 0;
`;

class WelcomeByNameRoute extends React.Component {
  static options = Object.freeze([
    { label: 'Cedar', value: 'wss://cedar.hideout.chat:8975' },
    { label: 'Maple', value: 'wss://maple.hideout.chat:8975' }
  ]);

  static get propTypes() {
    const { func, string } = PropTypes;

    return {
      name: string,
      onCommit: func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: this.constructor.options[0]
    };
  }

  handleCommit = () => this.props.onCommit({
    url: this.state.selectedOption.value
  });

  handleNetworkChange = (selectedOption) => this.setState({ selectedOption });

  render() {
    const {
      constructor: { options },
      handleCommit,
      handleNetworkChange,
      props: { name },
      state: { selectedOption }
    } = this;
    return <Fork
      condition={Boolean(name)}
      whenFalse={() => <Redirect to="/"/>}
      whenTrue={() => <Screen>
        <Header>
          <Logo/>
          <Welcome>
            <div>01001000 01001001 01000100 01000101</div>
            <div>01001111 01010101 01010100</div>
          </Welcome>
        </Header>
        <Content>
          <Message>
            <p>Ah, yes. Hello, <b style={{ color: '#cba6ff' }}>{name}</b>. Welcome to the Hideout.</p>
            <p>Your <b style={{ color: '#f0e060' }}>🔑 key</b> is ready. Head on through the door to get started.</p>
          </Message>
        </Content>
        <Network>
          <Label>Network</Label>
          <Select
            isClearable={false}
            onChange={handleNetworkChange}
            options={options.map((it) => ({ ...it, isSelected: selectedOption === it }))}
            placeholder={`${options[0].label} (default)`}
            styles={{
              option: (provided, state) => ({
                ...provided,
                color: state.theme.colors.neutral70
              })
            }}
          />
        </Network>
        <Door onClick={handleCommit}>🚪</Door>
      </Screen>}
    />;
  }
}

export { WelcomeByNameRoute };

const mapStateToProps = (state) => {
  const self = state.indexes.resources.by.type.self[0].relationships.identity;
  const name = state.indexes.resources.by.id[self.id][0].attributes.displayName;
  return { name };
};

const mapDispatchToProps = (dispatch, props) => ({
  onCommit: ({ url }) => dispatch(joinNetwork({ history: props.history, url }))
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeByNameRoute);
