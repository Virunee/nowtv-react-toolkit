import wdio from '../functional.setup';
import chai from 'chai';

const client = wdio.client;
const expect = chai.expect;

describe('Accordion', () => {
  before((done) => {
    client
      .init()
      .url(wdio.baseURL + '/').then(() => { done(); });
  });

  after((done) => {
    client.end(done);
  });

  it('is visible when customer clicks on content', (done) => {
    client.click('.accordion-item-title')
      .click('.accordion-item-content')
        .isVisible('.now-accordion-item.visible').then((isVisible) => {
          expect(isVisible).to.eq(true);
          done();
        });
  });
});
