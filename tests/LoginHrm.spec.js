import { test, expect } from '@playwright/test';
import data from "../testdata/logindata.json"

test('Login with valid credentials', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  //actions
  await page.locator("//input[@placeholder='Username']").fill(data.Username)
  await page.locator("//input[@placeholder='Password']").fill(data.Password)
  await page.locator("//button[@type='submit']").click()

  //assertions
  await expect(page.locator("//h6[text()='Dashboard']")).toBeVisible()
})

test('Login with valid username and invalid password', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  //actions
  await page.locator("//input[@placeholder='Username']").fill(data.Username)
  await page.locator("//input[@placeholder='Password']").fill(data.InvalidPSWD)
  await page.locator("//button[@type='submit']").click()

  //assertions
  await expect(page.locator("(//p[contains(@class,'oxd-text oxd-text--p')])[1]")).toBeVisible()
})

test('Login with Invalid username and valid password', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  //actions
  await page.locator("//input[@placeholder='Username']").fill(data.InvalidUN)
  await page.locator("//input[@placeholder='Password']").fill(data.Password)
  await page.locator("//button[@type='submit']").click()

  //assertions
  await expect(page.locator("(//p[contains(@class,'oxd-text oxd-text--p')])[1]")).toBeVisible()
})

test('Login with Invalid username and Invalid password', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  //actions
  await page.locator("//input[@placeholder='Username']").fill(data.InvalidUN)
  await page.locator("//input[@placeholder='Password']").fill(data.InvalidPSWD)
  await page.locator("//button[@type='submit']").click()

  //assertions
  await expect(page.locator("(//p[contains(@class,'oxd-text oxd-text--p')])[1]")).toBeVisible()
})

test('Try to login without entering credentials', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  //actions
  await page.locator("//button[@type='submit']").click()

  //assertions
  await expect(page.locator("(//div[@class='oxd-input-group oxd-input-field-bottom-space']//span)[1]")).toBeVisible()
  await expect(page.locator("(//div[@class='oxd-input-group oxd-input-field-bottom-space']//span)[2]")).toBeVisible()
})