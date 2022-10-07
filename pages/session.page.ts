import { expect, Page } from "@playwright/test"
import { magic_url } from "../utils/constants"

export const Session = (page: Page) => ({
    nameInput: page.locator('input[name="name"]'),
    selectlanguageDropdown: page.locator('button[name="language"]'),
    documentCountryInput: page.locator('input[name="documentCountry"]'),
    documentTypeDropdown: page.locator('button[name="documentType"]'),
    inContextRadioButton: page.locator('label:has-text("InContext")').nth(1),
    redirectRadioButton: page.locator('label:has-text("Redirect")').nth(1),
    veriffMeButton: page.locator('button:has-text("Veriff Me")'),
    alertBanner: page.locator('div[role="alert"]'),


    async open() {
        await page.goto('/')
    },

    async fill_name(name: string) {
        await this.nameInput.fill(name)
    },

    async choose_document_type(doc_type: string) {
        await this.documentTypeDropdown.click()
        await page.locator(`li[role="option"]:has-text("${doc_type}")`).click();
    },

    async select_language(language: string = "") {
        await this.selectlanguageDropdown.click()
        if (!language) {
            let languageOptions = await page.$$("xpath=//ul[contains(@class, 'Select-module_options')]/li")

            language = await languageOptions[Math.floor(Math.random() * languageOptions.length)].innerText()
        }
        await page.locator(`li[role="option"]:has-text("${language}")`).click();
    },

    async choose_doc_country(country: string = "") {
        await this.documentCountryInput.click()
        if (!country) {
            let countryOptions = await page.$$("xpath=//ul[contains(@class, 'Autocomplete-module_options')]/li")

            country = await countryOptions[Math.floor(Math.random() * countryOptions.length)].innerText()
        }
        await this.documentCountryInput.fill(country)
    },

    async choose_launch_veriff_via_redirect(redirect: boolean) {
        if (!redirect){
            await this.inContextRadioButton.click()
        }
        await this.redirectRadioButton.click()
    },

    async run_veriff_me() {
        await this.veriffMeButton.click()
        await page.waitForResponse("/")
        await expect(this.alertBanner, 'Request for "Verif me" failed').toHaveCount(0)
        await page.waitForURL(`${magic_url}/**`);
    },

    async fill_form_for_verification(name: string, doc_type: string) {
        await this.fill_name(name)
        await this.choose_doc_country()
        await page.keyboard.press("Enter")
        await this.choose_document_type(doc_type)
        await this.select_language()
        await this.choose_launch_veriff_via_redirect(false)
    },
    async get_doc_country_number() {
        let countryOptions = await page.$$("xpath=//ul[contains(@class, 'Autocomplete-module_options')]/li")
        return countryOptions.length
    }
})