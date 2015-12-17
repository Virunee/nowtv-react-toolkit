var assert = require('chai').assert;
var should = require('chai').should();
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

describe('Modal component', function(){
  var Modal;

  beforeEach(function() {
    Modal = require('../../src/components/Modal/Modal.react').default;
  });

  it('should render a modal', function () {
    var renderedComponent = TestUtils.renderIntoDocument(<Modal/>);
    var component = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'now-modal');
    should.exist(component);
  });

  it('should not be shown when first rendered', function () {
    var renderedComponent = TestUtils.renderIntoDocument(<Modal/>);
    var component = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'now-modal');
    component.className.should.not.include("visible");
  });

  it('should show modal when toggle is triggered', function () {
    class TestComponent extends React.Component {
      render() {
        return <Modal ref="modal"/>
      }
    }

    var renderedComponent = TestUtils.renderIntoDocument(<TestComponent/>);
    var modalComponent = TestUtils.findRenderedComponentWithType(renderedComponent, Modal);

    renderedComponent.refs.modal.toggle();
    var isVisible = renderedComponent.refs.modal.state.visible;

    ReactDOM.findDOMNode(modalComponent).className.should.include("visible");
    isVisible.should.be.true
  });

  it('should hide modal when toggle is triggered twice', function () {
    class TestComponent extends React.Component {
      render() {
        return <Modal ref="modal"/>
      }
    }

    var renderedComponent = TestUtils.renderIntoDocument(<TestComponent/>);
    var modalComponent = TestUtils.findRenderedComponentWithType(renderedComponent, Modal);

    renderedComponent.refs.modal.toggle();
    ReactDOM.findDOMNode(modalComponent).className.should.include("visible");

    renderedComponent.refs.modal.toggle();
    var isVisible = renderedComponent.refs.modal.state.visible;

    React.findDOMNode(modalComponent).className.should.not.include("visible");
    isVisible.should.be.false
  });

  it('should hide the modal when the x is clicked', function () {
    class TestComponent extends React.Component {
      render() {
        return <Modal ref="modal"/>
      }
    }

    var renderedComponent = TestUtils.renderIntoDocument(<TestComponent/>);
    var modalComponent = TestUtils.findRenderedComponentWithType(renderedComponent, Modal);
    var xIcon = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'close-icon');

    renderedComponent.refs.modal.toggle();
    TestUtils.Simulate.click(ReactDOM.findDOMNode(xIcon));

    ReactDOM.findDOMNode(modalComponent).className.should.not.include("visible");
  });

  it('should call close handler when the x is clicked', function () {
    let closeHandlerCalled = false;
    const closeHandler = () => {
      closeHandlerCalled = true;
    };

    class TestComponent extends React.Component {
      render() {
        return <Modal ref="modal" closeHandler={closeHandler}/>
      }
    }

    var renderedComponent = TestUtils.renderIntoDocument(<TestComponent/>);
    var xIcon = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'close-icon');

    renderedComponent.refs.modal.toggle();
    TestUtils.Simulate.click(ReactDOM.findDOMNode(xIcon));

    closeHandlerCalled.should.be.true;
  });

  it('only open the selected modal', function () {
    class TestComponent extends React.Component {
      render() {
        return (
          <div>
            <Modal ref="modal1" classes="modal-close"/>
            <Modal ref="modal2" classes="modal-open"/>
          </div>
        );
      }
    }

    var renderedComponent = TestUtils.renderIntoDocument(<TestComponent/>);
    var closedModalComponent = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'modal-close');
    var openModalComponent = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'modal-open');

    renderedComponent.refs.modal2.toggle();

    closedModalComponent.className.should.not.include("visible");
    openModalComponent.className.should.include("visible");
  });
});
