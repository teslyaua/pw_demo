import { Page } from "@playwright/test"

export const Magic = (page: Page) => ({
    headerText: page.locator('h1'),
    closeButton: page.locator('button[data-test-leave-session-button="true"]'),

    async get_header() {
        return await this.headerText
    },

    async click_exit_in_popup(exitButtonName: string) {
        await page.locator(`button:has-text("${exitButtonName}")`).click()
    },

    async close_magic_page() {
        let exitButtonName = await this.closeButton.getAttribute('aria-label')
        await this.closeButton.click()
        this.click_exit_in_popup(exitButtonName)
    },

    async get_aria_label_for_close_button() {
        await page.waitForLoadState()
        return await this.closeButton.getAttribute('aria-label')
    },

})