import { test, expect } from '@playwright/test';
import data from "../testdata/logindata.json"

test('Add Employment Status in OrangeHRM Admin Module', async ({ page }) => {
  
  // Step 1: Navigate to login URL
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  console.log('Navigated to OrangeHRM login page');

  // Step 2: Login as Admin
  console.log('Logging in as Admin...');
  await page.locator("//input[@placeholder='Username']").fill(data.Username);
  await page.locator("//input[@placeholder='Password']").fill(data.Password);
  await page.locator("//button[@type='submit']").click();

  // Wait for dashboard to load
  await expect(page.locator("//h6[text()='Dashboard']")).toBeVisible({ timeout: 5000 });
  console.log('Successfully logged in - Dashboard visible');

  // Step 3: Navigate to Admin Module
  console.log('Navigating to Admin module...');
  // Click on sidebar menu or admin option
  await page.locator("//a[contains(@href, '/admin')]").first().click();
  await page.waitForLoadState('networkidle');
  console.log('Admin module opened');

  // Step 4: Click on Job
  console.log('Clicking on Job...');
  // Wait for the admin page to load and find Job option
  await page.locator("//span[text()='Job']").click();
  await page.waitForLoadState('networkidle');
  console.log('Job section opened');

  // Step 5: Click on Employment Status
  console.log('Clicking on Employment Status...');
  await page.locator("//a[contains(text(), 'Employment Status')]").click();
  await page.waitForLoadState('networkidle');
  console.log('Employment Status page loaded');

  // Step 6: Click on Add Button
  console.log('Clicking Add button...');
  await page.locator("//button[contains(., 'Add')]").click();
  await page.waitForLoadState('networkidle');
  console.log('Add Employment Status form opened');

  // Step 7: Enter Employment Status Details
  console.log('Entering employment status details...');
  
  // Fill the Employment Status Name field
  const statusName = `Status_${Date.now()}`;
  await page.locator("//input[@placeholder='Name']").fill(statusName);
  console.log(`Entered Employment Status Name: ${statusName}`);

  // Step 8: Save the Employment Status
  console.log('Saving Employment Status...');
  await page.locator("//button[contains(@type, 'submit') and contains(., 'Save')]").click();
  await page.waitForLoadState('networkidle');
  console.log('Employment Status saved');

  // Step 9: Verify the Employment Status was added
  console.log('Verifying employment status was added...');
  
  // Wait for success message
  const successMessage = page.locator("//div[contains(@class, 'oxd-toast')]");
  await expect(successMessage).toBeVisible({ timeout: 5000 });
  console.log('Success message displayed');

  // Verify the newly added employment status appears in the list
  await page.locator("//a[contains(text(), 'Employment Status')]").click();
  await page.waitForLoadState('networkidle');
  
  // Search or verify the newly added status in the table
  const statusRow = page.locator(`//div[contains(text(), '${statusName}')]`);
  await expect(statusRow).toBeVisible({ timeout: 5000 });
  console.log(`✓ Employment Status '${statusName}' successfully added and verified`);

});

test('Add Multiple Employment Statuses', async ({ page }) => {
  
  // Login
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.locator("//input[@placeholder='Username']").fill(data.Username);
  await page.locator("//input[@placeholder='Password']").fill(data.Password);
  await page.locator("//button[@type='submit']").click();
  await expect(page.locator("//h6[text()='Dashboard']")).toBeVisible({ timeout: 5000 });

  // Navigate to Admin > Job > Employment Status
  await page.locator("//a[contains(@href, '/admin')]").first().click();
  await page.waitForLoadState('networkidle');
  
  await page.locator("//span[text()='Job']").click();
  await page.waitForLoadState('networkidle');
  
  await page.locator("//a[contains(text(), 'Employment Status')]").click();
  await page.waitForLoadState('networkidle');

  // Add multiple employment statuses
  const statuses = ['Contract', 'Permanent', 'Temporary'];

  for (const status of statuses) {
    console.log(`Adding employment status: ${status}...`);
    
    // Click Add button
    await page.locator("//button[contains(., 'Add')]").click();
    await page.waitForLoadState('networkidle');

    // Fill the name field
    const statusInput = page.locator("//input[@placeholder='Name']");
    await statusInput.fill(status);

    // Save
    await page.locator("//button[contains(@type, 'submit') and contains(., 'Save')]").click();
    await page.waitForLoadState('networkidle');

    // Wait for success
    await expect(page.locator("//div[contains(@class, 'oxd-toast')]")).toBeVisible({ timeout: 5000 });
    console.log(`✓ Employment status '${status}' added successfully`);

    // Return to employment status list
    await page.locator("//a[contains(text(), 'Employment Status')]").click();
    await page.waitForLoadState('networkidle');
  }

  console.log('✓ All employment statuses added and verified');
});
