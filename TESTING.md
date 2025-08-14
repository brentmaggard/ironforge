# Goals Page Testing Documentation

This document describes the comprehensive Puppeteer test suite for the Goals page functionality at `/goals`.

## Overview

The test suite (`test-goals.js`) contains 17 comprehensive tests that cover all aspects of the Goals page functionality, including:

- Page load and initial state
- Goal creation and form validation
- Goal type and exercise selection
- Color and date selection
- Goal list interactions
- Archive/restore functionality
- Delete functionality
- Drag and drop (if available)
- Responsive design
- Error handling
- Progress calculations
- Form reset and cancellation

## Prerequisites

1. **Application Running**: Ensure the IronForge application is running at `http://localhost:3001`
   ```bash
   npm run dev
   ```

2. **User Authentication**: You must be logged in to the application before running tests. The test suite will detect if you're redirected to the login page and inform you to authenticate first.

3. **Database Access**: The application should have access to a working database with the goals functionality enabled.

## Installation

The test dependencies are already included in the project. If you need to install them manually:

```bash
npm install --save-dev puppeteer @types/puppeteer
```

## Running Tests

### Interactive Mode (Default)
Run tests with browser visible for debugging:
```bash
npm run test:goals
```

### Headless Mode
Run tests in headless mode (faster, suitable for CI):
```bash
npm run test:goals:headless
```

### Direct Execution
You can also run the test file directly:
```bash
node test-goals.js
```

## Test Configuration

### Environment Variables

- `HEADLESS=true` - Run in headless mode
- `CI=true` - Automatically enables headless mode

### Test Parameters

You can modify these parameters in the `GoalsPageTester` constructor:

- `baseUrl`: Default is `http://localhost:3001`
- Browser viewport: Default is 1280x720
- Timeouts: Various timeouts are set throughout the tests

## Test Descriptions

### Test 1: Page Load and Initial State
- Verifies the Goals heading is visible
- Checks for New Goal button presence
- Validates goals list or empty state displays
- Tests for loading states and error handling

### Test 2: Create New Goal - Basic Flow
- Opens the New Goal form
- Fills in all required fields (Goal Name, Type, Target/Current values)
- Verifies unit defaults (e.g., "lbs" for strength goals)
- Creates the goal and verifies it appears in the list

### Test 3: Create Goal - Form Validation
- Tests empty form submission
- Validates required field errors
- Tests incomplete form scenarios
- Verifies Cancel button functionality

### Test 4: Goal Type Selection
- Tests all goal types (Strength, Endurance, Weight Loss, Consistency)
- Verifies visual highlighting of selected types
- Checks automatic unit changes based on goal type

### Test 5: Exercise Selection (Strength Goals)
- Tests exercise dropdown for strength goals
- Verifies "No specific exercise" option
- Checks if exercise options load properly

### Test 6: Color Selection
- Tests color picker functionality
- Verifies multiple color options
- Checks visual selection highlighting

### Test 7: Date Selection
- Tests start date (should default to today)
- Tests target date selection
- Verifies date inputs work correctly

### Test 8: Goal List Interaction
- Creates multiple test goals
- Tests goal card selection and highlighting
- Verifies progress circles and information display

### Test 9: Goal Details Panel
- Tests right panel goal details display
- Verifies progress chart rendering
- Checks for action buttons (Edit, Archive, Copy, Delete)

### Test 10: Archive/Restore Functionality
- Creates and archives a test goal
- Tests "Show Archived" button
- Verifies archived goals display with badges

### Test 11: Delete Functionality
- Creates a test goal for deletion
- Tests delete confirmation dialog
- Verifies goal removal from list

### Test 12: Drag and Drop (if functional)
- Checks for drag handles (grip icons)
- Tests draggable attributes
- Verifies reordering functionality

### Test 13: Show/Hide Archived Goals
- Tests toggle between showing/hiding archived goals
- Verifies button text changes
- Checks archived goal visibility

### Test 14: Responsive Design
- Tests mobile viewport (375x667)
- Tests tablet viewport (768x1024)
- Verifies modal responsiveness

### Test 15: Error States
- Checks for loading indicators
- Monitors console errors
- Tests error handling scenarios

### Test 16: Progress Calculations
- Creates goals with specific values
- Verifies progress percentage calculations
- Tests current/target value displays

### Test 17: Form Reset and Cancel
- Tests form data entry and cancellation
- Verifies form resets when reopened
- Tests escape key functionality

## Test Results

The test suite provides comprehensive reporting:

- **Total Tests**: Number of individual test assertions
- **Passed/Failed**: Count of successful and failed tests
- **Pass Rate**: Percentage of tests that passed
- **Detailed Results**: List of all test outcomes with messages

### Sample Output
```
📊 TEST REPORT
==================================================
Total Tests: 42
Passed: 38
Failed: 4
Pass Rate: 90.5%

❌ FAILED TESTS:
  • Exercise Options Load: No exercise options found
  • Drag and Drop Elements: Elements not draggable
  • Mobile Modal Responsive: Modal not found on mobile
  • Hide Archived Functionality: Button text did not change back

✅ PASSED TESTS:
  • Goals Heading: 
  • New Goal Button: 
  • Goals List/Empty State: 
  ...
```

## Cleanup

The test suite automatically cleans up any test goals created during the testing process. Test goals are tracked and deleted at the end of the test run to leave the application in a clean state.

## Troubleshooting

### Common Issues

1. **Authentication Required**
   - Error: "Redirected to login - manual authentication required"
   - Solution: Log in to the application manually before running tests

2. **Port/URL Issues**
   - Error: "Failed to load page: net::ERR_CONNECTION_REFUSED"
   - Solution: Ensure the application is running on `http://localhost:3001`

3. **Element Not Found Errors**
   - These may indicate UI changes or loading issues
   - Check if the application is fully loaded
   - Verify the element selectors are still valid

4. **Console Errors**
   - The test suite monitors and reports console errors
   - These may indicate JavaScript issues in the application

### Debugging

1. **Run in Interactive Mode**: Use `npm run test:goals` to see the browser actions
2. **Check Screenshots**: The test suite can be modified to take screenshots on failures
3. **Increase Timeouts**: Modify timeout values if the application is slow to load
4. **Check Network Tab**: Use browser dev tools to monitor network requests

## Extending Tests

To add new tests:

1. Create a new test method following the pattern `async test[TestName]()`
2. Add appropriate logging with `this.logResult()`
3. Include the test in the `runAllTests()` method
4. Update this documentation

### Example Test Method
```javascript
async testNewFeature() {
  console.log('\n🧪 Test: New Feature');
  
  try {
    // Test implementation
    const element = await this.page.$('selector');
    if (element) {
      this.logResult('Feature Test', true);
    } else {
      this.logResult('Feature Test', false, 'Element not found');
    }
    
    return true;
  } catch (error) {
    return this.logResult('New Feature Test', false, error.message);
  }
}
```

## CI/CD Integration

The test suite is designed for CI/CD integration:

1. **Headless Mode**: Automatically enabled with `CI=true`
2. **Exit Codes**: Returns appropriate exit codes (0 for success, 1 for failure)
3. **JSON Output**: Can be modified to output results in JSON format
4. **Docker Compatible**: Works in containerized environments

### Example CI Configuration
```yaml
- name: Run Goals Page Tests
  run: |
    npm run dev &
    sleep 10  # Wait for app to start
    npm run test:goals:headless
```

## Maintenance

Regular maintenance tasks:

1. **Update Selectors**: Keep element selectors up to date with UI changes
2. **Add New Tests**: Add tests for new features as they're developed
3. **Review Timeouts**: Adjust timeouts based on application performance
4. **Update Documentation**: Keep this documentation current with test changes

## Support

For issues with the test suite:

1. Check the troubleshooting section above
2. Review the console output for specific error messages
3. Examine the test results report for detailed failure information
4. Run tests in interactive mode to observe browser behavior