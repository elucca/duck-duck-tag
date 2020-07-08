/* eslint jest/expect-expect: off, jest/no-test-callback: off */
import { ClientFunction, Selector } from 'testcafe';
import { getPageUrl } from './helpers';

const clickToConfigureServicesLink = t => t.click(Selector('a').withExactText('Configure services'));

const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Configuration`.page('../../app/app.html').afterEach(assertNoConsoleErrors)
  .beforeEach(clickToConfigureServicesLink)
  .afterEach(assertNoConsoleErrors);

test('should navigate to the home page with click to return arrow', async t => {
  await t
    .click(Selector('i').withAttribute('class', 'fa fa-arrow-left fa-3x'))
    .expect(getPageUrl())
    .contains('/')
})