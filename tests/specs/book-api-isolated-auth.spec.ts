import { test } from '@playwright/test'
import { APIRequestContext } from '@playwright/test'
import baseAPIURL from '../api/requests/create-books-collection'
import createBooksAPIRequest from '../api/requests/create-books-collection'
import userData from '../api/data/user-data'

const env = process.env.ENV!;
const password = process.env.PASSWORD!;
const userId = process.env.USERID!;
const userName = process.env.USERNAME!;

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        baseURL: baseAPIURL[env].api,
        extraHTTPHeaders: {
            Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
            Accept: 'application/json'
        }
    })
})

test.describe('Book - API with isolated auth', async () => {
    test('Add book to the colection', async () => {
        await createBooksAPIRequest.addBookToCollection(apiContext, userId, userData.books.duplicate)
    })  
})