import { test, expect } from '@playwright/test';

import data from "../testdata/rediffdetails.json"

test('verify create a new account', async ({ page }) => {
    await page.goto('https://register.rediff.com/register/register.php?FormName=user_details');

    await page.locator("input[placeholder='Enter your full name']").fill(data.username)
    await page.locator("//input[@placeholder='Enter Rediffmail ID']").fill(data.mail)
    await page.locator("#newpasswd").fill(data.pswd)
    await page.locator("#newpasswd1").fill(data.pswd)
    await page.locator("(//div[@class='form-group']//select)[1]").selectOption(data.day)
    await page.locator("//select[@class='middle month']").selectOption(data.Month)
    await page.locator("(//label[text()='Date of Birth']/following-sibling::select)[3]").selectOption(data.Year)
    await page.locator("(//div[@class='gender']//label)[2]").check()
    await page.locator("//label[text()='I live in']/following-sibling::select").selectOption(data.Country)
    await page.locator("//label[text()='City']/following-sibling::select").selectOption(data.City)
    await page.locator("//input[@placeholder='Enter recovery email']").fill(data.recovery_mail)
    await page.locator("(//label[normalize-space(text())='My Mobile Number']/following::input)[2]").fill(data.mobile)
})