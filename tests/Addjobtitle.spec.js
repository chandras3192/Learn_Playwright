import { test, expect } from '@playwright/test';
import data from "../testdata/logindata.json"

test('Login with valid credentials', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  //actions
  await page.locator("//input[@placeholder='Username']").fill(data.Username)
  await page.locator("//input[@placeholder='Password']").fill(data.Password)
  await page.locator("//button[@type='submit']").click()

  //assertions
  //await expect(page.locator("//h6[text()='Dashboard']")).toBeVisible()
  await page.locator("//span[text()='Admin']").click()
  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers")
  await page.locator("//span[normalize-space(text())='Job']").click()
  await page.locator("(//a[@role='menuitem'])[1]").click()
  await page.locator("//button[contains(.,'Add')]").click()
  await page.locator("(//input[@class='oxd-input oxd-input--active'])[2]").fill("Test Engineer")
  await page.locator("//textarea[@placeholder='Type description here']").fill("Who tests the different application with lot of ease")
  await page.locator("//textarea[@placeholder='Add note']").fill("Testing web applications")


})