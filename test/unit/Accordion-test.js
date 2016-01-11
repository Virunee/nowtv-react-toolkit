import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import Accordion from '../../src/components/Accordion/Accordion.react';
import AccordionItem from '../../src/components/Accordion/AccordionItem.react';

describe('Accordion component', () => {
  it('should display an accordion', () => {
    const renderedComponent = TestUtils.renderIntoDocument(<Accordion />);
    const accordion = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'now-accordion');
    const element = ReactDOM.findDOMNode(accordion);

    expect(element).to.exist;
  });

  it('should render accordion items', () => {
    const renderedComponent = TestUtils.renderIntoDocument(
      <Accordion>
        <AccordionItem />
        <AccordionItem />
        <AccordionItem />
      </Accordion>
    );

    const accordion = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'now-accordion');
    const accordionItems = ReactDOM.findDOMNode(accordion).children;
    const accordionItem = ReactDOM.findDOMNode(accordionItems[0]);

    expect(accordionItems.length).to.equal(3);
    expect(accordionItem.className.trim()).to.equal('now-accordion-item');
  });

  it('should open an accordion item when clicked', () => {
    const renderedComponent = TestUtils.renderIntoDocument(
      <Accordion>
        <AccordionItem />
        <AccordionItem />
        <AccordionItem />
      </Accordion>
    );

    const accordion = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'now-accordion');
    const accordionItems = ReactDOM.findDOMNode(accordion).children;
    const accordionItem = ReactDOM.findDOMNode(accordionItems[0]);
    const accordionItem2 = ReactDOM.findDOMNode(accordionItems[1]);
    const accordionItem3 = ReactDOM.findDOMNode(accordionItems[2]);

    TestUtils.Simulate.click(accordionItem.firstChild);
    expect(accordionItem.className.trim()).to.include('visible');
    expect(accordionItem2.className.trim()).to.not.include('visible');
    expect(accordionItem3.className.trim()).to.not.include('visible');
  });

  it('should close an open accordion item when it is clicked again', () => {
    const renderedComponent = TestUtils.renderIntoDocument(
      <Accordion>
        <AccordionItem />
        <AccordionItem />
        <AccordionItem />
      </Accordion>
    );

    const accordion = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'now-accordion');
    const accordionItems = ReactDOM.findDOMNode(accordion).children;
    const accordionItem = ReactDOM.findDOMNode(accordionItems[0]);
    const accordionItem2 = ReactDOM.findDOMNode(accordionItems[1]);
    const accordionItem3 = ReactDOM.findDOMNode(accordionItems[2]);

    TestUtils.Simulate.click(accordionItem.firstChild);
    expect(accordionItem.className.trim()).to.include('visible');
    expect(accordionItem2.className.trim()).to.not.include('visible');
    expect(accordionItem2.className.trim()).to.not.include('visible');

    TestUtils.Simulate.click(accordionItem.firstChild);
    expect(accordionItem.className.trim()).to.not.include('visible');
    expect(accordionItem2.className.trim()).to.not.include('visible');
    expect(accordionItem2.className.trim()).to.not.include('visible');
  });
});
