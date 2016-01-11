import React from 'react';
import classNames from 'classnames';

class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openItem: null
    };
  }

  _itemClicked(id) {
    let openItem = id;

    if (id === this.state.openItem) {
      openItem = null;
    }

    this.setState({
      openItem
    });
  }

  render() {
    const classes = classNames('now-accordion', [this.props.classes]);

    const newChildren = React.Children.map(this.props.children, (child, index) => {
      const onItemClicked = (event) => {
        event.preventDefault();
        this._itemClicked(index);
      };

      const newProps = {
        handleVisiblity: onItemClicked,
        isOpen: this.state.openItem === index
      };

      if (index === this.state.openItem) {
        newProps.classes = 'visible';
      }

      return React.cloneElement(child, { ...newProps });
    });

    return (
      <div className={classes}>
        {newChildren}
      </div>
    );
  }
}

Accordion.propTypes = {
  children: React.PropTypes.node,
  classes: React.PropTypes.string
};

export default Accordion;
