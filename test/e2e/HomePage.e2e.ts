/* eslint jest/expect-expect: off, jest/no-test-callback: off */
import { ClientFunction, Selector } from 'testcafe';
import { getPageUrl } from './helpers';

const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

test('should navigate to "Analyze images" with click to link', async t => {
  await t
    .click(Selector('a').withExactText('Analyze images'))
    .expect(getPageUrl())
    .contains('/image')
})

test('should navigate to "Configure services" with click to link', async t => {
  await t
    .click(Selector('a').withExactText('Configure services'))
    .expect(getPageUrl())
    .contains('/configuration')
})