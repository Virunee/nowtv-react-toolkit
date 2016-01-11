import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

import AccordionItem from '../../src/components/Accordion/AccordionItem.react';

describe('Accordion item component', () => {
  it('should display an AccordionItem', () => {
    const renderedComponent = TestUtils.renderIntoDocument(<AccordionItem />);
    const accordionItem = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'now-accordion-item');

    expect(accordionItem).to.exist;
  });

  it('should have a title and content', () => {
    const renderedComponent = TestUtils.renderIntoDocument(
      <AccordionItem title="My accordion item">
        <p>Wooo exciting</p>
      </AccordionItem>
    );

    const accordionTitle = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'accordion-item-title');
    const accordionContent = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'accordion-item-content');

    expect(accordionTitle.textContent).to.equal('My accordion item');
    expect(accordionContent.textContent).to.equal('Wooo exciting');
  });

  it('tracks accordion as closing when opened', () => {
    const renderedComponent = TestUtils.renderIntoDocument(
      <AccordionItem title="My accordion item" isOpen={true}>
        <p>Wooo exciting</p>
      </AccordionItem>
    );

    const accordionTitle = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'accordion-item-title');

    expect(accordionTitle.getAttribute('data-tracking-context')).to.equal('closing');
  });

  it('tracks accordion as opening when closed', () => {
    const renderedComponent = TestUtils.renderIntoDocument(
      <AccordionItem title="My accordion item" isOpen={false}>
        <p>Wooo exciting</p>
      </AccordionItem>
    );

    const accordionTitle = TestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'accordion-item-title');

    expect(accordionTitle.getAttribute('data-tracking-context')).to.equal('opening');
  });
});
