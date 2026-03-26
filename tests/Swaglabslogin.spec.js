import { test, expect } from '@playwright/test';

import data from "../testdata/logindataSwaglabs.json"

test('Verify user with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator("input[placeholder='Username']").fill(data.Uname)
    await page.locator("input[placeholder='Password']").fill(data.Password)
    await page.locator("input[type='submit']").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator("span[data-test='title']")).toBeVisible()
})

test('Verify user with Valid username and Invalid Password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator("input[placeholder='Username']").fill(data.Uname)
    await page.locator("input[placeholder='Password']").fill(data.WrongPSWD)
    await page.locator("input[type='submit']").click()
    
    await expect(page.locator("h3[data-test='error']")).toBeVisible()
})

test('Verify user with Invalid username and valid Password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator("input[placeholder='Username']").fill(data.WrongUN)
    await page.locator("input[placeholder='Password']").fill(data.Password)
    await page.locator("input[type='submit']").click()
    
    await expect(page.locator("h3[data-test='error']")).toBeVisible()
})

test('Verify user with Invalid username and Password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator("input[placeholder='Username']").fill(data.WrongUN)
    await page.locator("input[placeholder='Password']").fill(data.WrongPSWD)
    await page.locator("input[type='submit']").click()
    
    await expect(page.locator("h3[data-test='error']")).toBeVisible()
})

test('Try to login without entering Username and Password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    
    await page.locator("input[type='submit']").click()
    
    await expect(page.locator("h3[data-test='error']")).toBeVisible()
})

test('Verify User using locked_out_user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator("input[placeholder='Username']").fill(data.Uname1)
    await page.locator("input[placeholder='Password']").fill(data.Password)
    await page.locator("input[type='submit']").click()
    
    await expect(page.locator("h3[data-test='error']")).toBeVisible()
})

test('Verify User using problem_user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator("input[placeholder='Username']").fill(data.Uname2)
    await page.locator("input[placeholder='Password']").fill(data.Password)
    await page.locator("input[type='submit']").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator("span[data-test='title']")).toBeVisible()
})

test('Verify User using performance_glitch_user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator("input[placeholder='Username']").fill(data.Uname3)
    await page.locator("input[placeholder='Password']").fill(data.Password)
    await page.locator("input[type='submit']").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator("span[data-test='title']")).toBeVisible()
})

test('Verify User using error_user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator("input[placeholder='Username']").fill(data.Uname4)
    await page.locator("input[placeholder='Password']").fill(data.Password)
    await page.locator("input[type='submit']").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator("span[data-test='title']")).toBeVisible()
})

test('Verify User using visual_user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator("input[placeholder='Username']").fill(data.Uname5)
    await page.locator("input[placeholder='Password']").fill(data.Password)
    await page.locator("input[type='submit']").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(page.locator("span[data-test='title']")).toBeVisible()
})