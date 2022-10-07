import { faker } from "@faker-js/faker"

export function covert_doc_types_to_api(doc_type: string) {
    let api_doc_type = doc_type.replace(/ /g,"_").replace("'","").toUpperCase()
    return api_doc_type
  }

export function get_stable_api_test_data() {
    let test_data = {
      full_name: `autotetst_${faker.name.fullName()}`,
      lang: "et",
      document_country: 'EE',
      document_type: 'PASSPORT',
      additionalData: {
          isTest: false
      }
  }
    return test_data
  }

export function get_random_language_locale() {
  // faker.random.locale() - Doesn't work because not all languages are supported
  let languageOptions = ['en', 'et', 'uk', 'bg', 'it']
  return languageOptions[Math.floor(Math.random() * languageOptions.length)]
}

export function get_random_doc_country_locale() {
  // faker.random.locale() - Doesn't work because not probably all countries are supported
  let countryOptions = ['AL', 'LT', 'AT', 'TR', 'CA' ]
  return countryOptions[Math.floor(Math.random() * countryOptions.length)]
}
