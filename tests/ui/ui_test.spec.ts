import { test, expect } from '@playwright/test';
import { App } from '../../pages/app';
import { faker } from '@faker-js/faker';
import { doc_types } from '../../utils/constants';

const extendedTest = test.extend<{ app: ReturnType<typeof App> }>({
  app: async ({ page }, use) => {
    await use(App(page));
  }
})

extendedTest.beforeEach(async ({ app  }) => {
  await app.session_page.open();
});

for (const doc_type of doc_types) {
  extendedTest(`[UI] Check session creation for ${doc_type}`, async ({ app }) => {
    await app.session_page.fill_form_for_verification(`autotetst_${faker.name.fullName()}`, doc_type)
    await app.session_page.run_veriff_me()

    await expect(await app.magic_page.get_header()).toBeVisible();
    await app.magic_page.close_magic_page()
  });
}

extendedTest(`[UI] Check session creation with Redirect`, async ({ app }) => {
  let doc_type = doc_types[Math.floor(Math.random() * doc_types.length)]

  await app.session_page.fill_form_for_verification(`autotetst_${faker.name.fullName()}`, doc_type)
  await app.session_page.choose_launch_veriff_via_redirect(true)
  await app.session_page.run_veriff_me()

  await expect(await app.magic_page.get_header()).toBeVisible();
  await app.magic_page.close_magic_page()
});

extendedTest(`Check autocomplete for Document country`, async ({ app }) => {
  await app.session_page.choose_doc_country('Ukr')
  await expect(await app.session_page.get_doc_country_number(), 'Countries number is not correct').toBe(2)
});

extendedTest(`[UI] Check Eesti language aria-labels`, async ({  app }) => {
  let doc_type = doc_types[Math.floor(Math.random() * doc_types.length)]

  await app.session_page.fill_form_for_verification(`autotetst_${faker.name.fullName()}`, doc_type)
  await app.session_page.select_language('Eesti')
  await app.session_page.run_veriff_me()

  expect(await app.magic_page.get_aria_label_for_close_button(), 'Close button aria label should be Välju').toBe('Välju')
});