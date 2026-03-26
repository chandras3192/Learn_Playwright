import { test, expect } from '@playwright/test';

test('verifying the textboxes', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('link', { name: 'Elements' }).click();
  await page.getByRole('link', { name: 'Text Box' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('chanda');
  await page.getByRole('textbox', { name: 'name@example.com' }).click();
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('chanda@123.com');
  await page.getByRole('textbox', { name: 'Current Address' }).click();
  await page.getByRole('textbox', { name: 'Current Address' }).fill('bangalore');
  await page.locator('#permanentAddress').click();
  await page.locator('#permanentAddress').fill('yanam');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Name:chanda')).toBeVisible();
  await page.getByText('Email:chanda@123.com').click();
  await page.getByText('Current Address :bangalore').click();
  await page.getByText('Permananet Address :yanam').click();
});