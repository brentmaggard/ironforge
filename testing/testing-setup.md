# Goals Page Testing & Issue Management Workflow

## Quick Setup

### 1. Install Dependencies
```bash
npm install puppeteer
# or
yarn add puppeteer
```

### 2. Save the Test Files
- Save the first artifact as `goals-test-suite.js`
- Save the second artifact as `issue-manager.js`

### 3. Make Scripts Executable
```bash
chmod +x goals-test-suite.js
chmod +x issue-manager.js
```

## Complete Workflow

### Phase 1: Run Initial Tests
```bash
# Start your local development server first
npm start  # or your dev server command

# Run the test suite
node goals-test-suite.js
```

This will:
- ✅ Navigate to http://localhost:3001/goals
- ✅ Run all 17 test scenarios
- ✅ Generate `goals-test-report.json` with detailed results
- ✅ Show console output with real-time test progress

### Phase 2: Load Issues for Management
```bash
# Load issues from test report
node issue-manager.js load goals-test-report.json

# View the fix plan organized by priority
node issue-manager.js plan
```

### Phase 3: Systematic Issue Fixing

#### See what to fix next:
```bash
node issue-manager.js next
```

#### Start working on an issue:
```bash
node issue-manager.js start GOAL-001
```

#### Mark issue as completed:
```bash
node issue-manager.js complete GOAL-001 "Added missing data-testid='new-goal-button' to NewGoalButton component"
```

#### Check progress:
```bash
node issue-manager.js status
```

### Phase 4: Generate TODO Lists for Claude
```bash
# Generate formatted todo list for Claude
node issue-manager.js todo
```

This outputs todos in a format perfect for Claude's TodoWrite tool.

## Advanced Workflows

### Batch Fix Strategy
```bash
# See issues grouped by category
node issue-manager.js batch
```

This groups issues like:
- **Form Validation** (all validation-related issues)
- **UI Elements** (missing buttons, inputs, etc.)
- **Styling** (visual/highlighting issues)
- **Functionality** (broken features)
- **Data Handling** (state/persistence issues)

### Re-run Tests After Fixes
```bash
# Run tests again to verify fixes
node goals-test-suite.js

# Load new results and compare
node issue-manager.js load goals-test-report.json
node issue-manager.js status
```

## Example Test Output

```
🎯 Starting Goals Page Test Suite...

📍 Navigating to Goals page...
🧪 Test 1: Page Load and Initial State
🧪 Test 2: Create New Goal - Basic Flow
🧪 Test 3: Create Goal - Form Validation
🧪 Test 4: Goal Type Selection
🧪 Test 5: Exercise Selection (Strength Goals)

📊 TEST RESULTS SUMMARY
========================
Total Issues Found: 12
High Priority: 4
Medium Priority: 6
Low Priority: 2

🐛 ISSUES FOUND:
================

HIGH PRIORITY (4):
1. Missing New Goal Button
   Description: New Goal button not found
   Test: Test 1

2. Modal Not Opening
   Description: New Goal modal did not open after clicking button
   Test: Test 2
```

## File Structure After Setup

```
your-project/
├── goals-test-suite.js          # Main test runner
├── issue-manager.js             # Issue management CLI
├── goals-test-report.json       # Test results (generated)
├── goals-issues.json            # Issue tracking (generated)
├── fix-log.md                   # Fix history (generated)
└── package.json                 # Add test scripts here
```

## Recommended Package.json Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "test:goals": "node goals-test-suite.js",
    "test:goals:watch": "nodemon goals-test-suite.js",
    "issues:load": "node issue-manager.js load",
    "issues:plan": "node issue-manager.js plan",
    "issues:status": "node issue-manager.js status",
    "issues:todo": "node issue-manager.js todo",
    "issues:next": "node issue-manager.js next",
    "issues:batch": "node issue-manager.js batch"
  }
}
```

Then use:
```bash
npm run test:goals
npm run issues:plan
npm run issues:next
```

## Common Issue Types & Solutions

### High Priority Issues
- **Missing Elements**: Add proper data-testid attributes
- **Broken Functionality**: Fix event handlers and API calls
- **Form Validation**: Implement proper validation logic

### Medium Priority Issues  
- **UI Elements**: Add missing buttons, inputs, dropdowns
- **State Management**: Fix component state updates
- **Navigation**: Ensure proper routing and redirects

### Low Priority Issues
- **Visual Polish**: CSS styling and animations
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimize loading and rendering

## Tips for Efficient Fixing

1. **Fix High Priority First**: These are usually blocking core functionality
2. **Batch Similar Issues**: Fix all form validation issues together
3. **Test Immediately**: Run specific tests after each fix
4. **Document Fixes**: Use descriptive messages when marking complete
5. **Re-run Full Suite**: After fixing 5-10 issues, run full test suite

## Integration with Development

### During Development:
```bash
# Quick test run during development
npm run test:goals

# Check what needs fixing
npm run issues:next

# Mark progress
node issue-manager.js complete GOAL-XXX "Fixed the issue"
```

### Before Committing:
```bash
# Full test suite
npm run test:goals

# Ensure no high priority issues
npm run issues:status
```

### CI/CD Integration:
```bash
# In your CI script
npm run test:goals
if [ $? -ne 0 ]; then
  echo "Goals tests failed - check report"
  exit 1
fi
```

This workflow gives you a systematic approach to:
- ✅ Identify all issues with comprehensive testing
- ✅ Prioritize fixes by impact  
- ✅ Track progress systematically
- ✅ Maintain quality during development
- ✅ Generate documentation of fixes automatically