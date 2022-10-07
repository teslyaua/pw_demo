import { Page } from "@playwright/test";
import { Magic } from "./magic.page";
import { Session } from "./session.page";


export const App = (page: Page) => ({
    session_page: Session(page),
    magic_page: Magic(page)
})