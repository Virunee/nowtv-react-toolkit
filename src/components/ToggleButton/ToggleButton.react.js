import React from 'react';
import classNames from 'classnames';

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: (props.checked || false) };
    this.handleChecked = this.handleChecked.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleChecked() {
    if (!this.props.disableToggleOnClick) {
      this.setState({ checked: !this.state.checked });
    }

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  onChange() {
    this.setState({
      checked: this.props
    });
  }

  render() {
    const classes = classNames([this.props.classes]);
    const checkBoxClasses = classNames(
      {
        disabled: this.props.disabled,
        checked: this.state.checked
      }
    );

    const { checked, ...other } = this.props;

    return (
      <div className={classNames('now-toggle-container', classes)}>
        { this.props.offText ? <span className="toggle-label off">{this.props.offText}</span> : null }
        {this.props.disabled ?
          <div className="toggle-button disabled"></div>
          :
          <div className={classNames('toggle-button', checkBoxClasses)} onClick={this.handleChecked}>
            <input defaultChecked={this.state.checked} type="checkbox" {...other}/>
          </div>
        }
        { this.props.onText ? <span className="toggle-label on">{this.props.onText}</span> : null }
      </div>
    );
  }
}

ToggleButton.propTypes = {
  classes: React.PropTypes.string,
  checked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  disableToggleOnClick: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  offText: React.PropTypes.string,
  onText: React.PropTypes.string
};

export default ToggleButton;
