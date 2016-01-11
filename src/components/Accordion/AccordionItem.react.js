import React from 'react';
import classNames from 'classnames';

class AccordionItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = classNames('now-accordion-item', [this.props.classes]);

    return (
      <div className={classes}>
        <a href="#" className="accordion-item-title" data-tracking-context={this.props.isOpen ? 'closing' : 'opening'} onClick={this.props.handleVisiblity}>{this.props.title}</a>

        <div className="accordion-item-content" style={{ maxHeight: this.props.isOpen ? (this.props.maxHeight || 500) : 0 }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

AccordionItem.propTypes = {
  children: React.PropTypes.node,
  classes: React.PropTypes.string,
  handleVisiblity: React.PropTypes.func,
  isOpen: React.PropTypes.bool,
  maxHeight: React.PropTypes.number,
  title: React.PropTypes.string
};

export default AccordionItem;
