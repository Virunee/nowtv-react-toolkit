import React, { PropTypes } from 'react';

export default class Button extends React.Component {

  static defaultProps = {
    type: 'primary'
  };

  static propTypes = {
    type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
    color: PropTypes.oneOf(['red', 'yellow', 'green', 'blue', 'grey']).isRequired
  };

  render() {
    const baseClass = 'now-button';
    const className = `${baseClass}_${this.props.type}_${this.props.color}`;
    return (
      <button className={className} {...this.props}>{this.props.children}</button>
    );
  }
}
