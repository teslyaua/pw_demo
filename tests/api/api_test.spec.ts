import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { doc_types, magic_url, session_endpoint } from '../../utils/constants';
import { covert_doc_types_to_api, get_random_doc_country_locale, get_random_language_locale, get_stable_api_test_data } from '../../utils/data_helper';

for (const doc_type of doc_types) {
    test(`[API] Create new session for ${doc_type} doc type`, async ({ request }) => {
        const newSession = await request.post(`/`, {
        data: {
            full_name: `autotetst_${faker.name.fullName()}`,
            lang: get_random_language_locale(),
            document_country: get_random_doc_country_locale(),
            document_type: covert_doc_types_to_api(doc_type),
            additionalData: {
                isTest: false
            }
        }
        });

        expect(newSession.ok(), `Request was failed with status ${newSession.status()}`).toBeTruthy();
        let resp_body = await newSession.json()
        expect(resp_body.integrationUrl).toContain(`${magic_url}`)
        expect(resp_body.sessionToken).not.toBeNull()
    });
}

test(`[API] Get newly create session`, async ({ request }) => {
    const newSession = await request.post(`/`, {
        data: get_stable_api_test_data()
    });

    expect(newSession.ok(), `Request was failed with status ${newSession.status()}`).toBeTruthy();
    let new_session_resp_body = await newSession.json() ;

    const getSession = await request.get(`${magic_url}${session_endpoint}`, {
        headers: {
            'Authorization': `Bearer ${new_session_resp_body.sessionToken}`,
          }
    });

    let get_session_resp_body = await getSession.json();
    expect(getSession.ok(), `Request was failed with status ${newSession.status()}`).toBeTruthy();
    expect(get_session_resp_body.status).toEqual('created')    
    expect(get_session_resp_body.initData.language).toEqual(get_stable_api_test_data().lang)  
    expect(get_session_resp_body.initData.preselectedDocument.country).toEqual(get_stable_api_test_data().document_country)  
    expect(get_session_resp_body.initData.preselectedDocument.type).toEqual(get_stable_api_test_data().document_type)  
});