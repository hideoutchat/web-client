import PropTypes from 'prop-types';
import React from 'react';

const INTERVAL = 30000;
const MINUTE = 60000;
const HOUR = 3600000;

class Timestamp extends React.Component {
  static get propTypes() {
    const { string } = PropTypes;
    return {
      value: string.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = { label: props.value };
  }

  componentDidMount() {
    this.handleLabelUpdate();
    this.start();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.value !== this.props.value) {
      this.handleLabelUpdate();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  handleLabelUpdate = () => {
    const now = new Date().getTime();
    const then = new Date(this.props.value).getTime();
    const delta = now - then;

    if (delta < MINUTE) {
      this.setState({ label: 'just now' });
    } else if (delta < HOUR) {
      const m = Math.floor(delta / MINUTE);
      this.setState({ label: m === 1 ? 'a minute ago' : `${m} minutes ago` });
    } else {
      this.setState({ label: 'over an hour ago' });
    }
  };

  render() {
    const { props: { value }, state: { label } } = this;
    return <span title={value}>{label}</span>;
  }

  start() {
    if (!this.timer) {
      this.timer = setInterval(this.handleLabelUpdate, INTERVAL);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

export default Timestamp;
