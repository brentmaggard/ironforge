# Testing Directory

This directory contains all testing-related files for the IronForge project.

## Directory Structure

```
testing/
├── README.md                    # This file - testing documentation
├── testing-setup.md            # Testing environment setup instructions
├── issue-manager.js            # Issue tracking and management utilities
├── puppeteer-scripts/          # All Puppeteer test scripts
│   ├── debug-goals-content.js  # Debug script for goals page content
│   ├── detailed-analysis.js    # Detailed page analysis script
│   ├── final-comprehensive-test.js # Comprehensive test suite (latest)
│   ├── goals-page-tests-fixed.js # Fixed version of goals tests
│   ├── goals-test-suite.js     # Goals-specific test suite
│   ├── inspect-goals-page.js   # Page inspection utilities
│   ├── run-tests.js           # Test runner script
│   ├── test-goals-page.js     # Goals page test script
│   └── test-goals.js          # Basic goals functionality tests
├── puppeteer-results/          # Test results and reports
│   ├── final-goals-test-results.json # Latest comprehensive test results
│   ├── goals-page-test-results-fixed.json # Fixed test results
│   ├── goals-page-test-results.json # Previous test results
│   └── goals-test-report.json  # Goals test report
└── screenshots/               # Test screenshots and visual evidence
    ├── goals-debug-screenshot.png # Debug screenshot
    ├── goals-final-test-desktop.png # Desktop view test screenshot
    ├── goals-final-test-mobile.png # Mobile view test screenshot
    ├── goals-page-final-analysis.png # Final analysis screenshot
    └── goals-page-screenshot.png # General page screenshot
```

## Test Results Summary

### Latest Test Results (final-goals-test-results.json)
- **Success Rate**: 87% (20/23 tests passed)
- **Date**: August 15, 2025
- **Status**: Ready for bug fixes

### Key Findings
1. ✅ **Working**: Page load, data display, responsive design, performance
2. ⚠️ **Needs Fix**: New Goal modal not opening, goal card selection
3. 🔍 **Minor**: Progress circle detection in automated tests

## Running Tests

### Prerequisites
- Node.js and npm installed
- Puppeteer installed (`npm install puppeteer`)
- Development server running on `http://localhost:3000`
- Testing mode enabled (authentication bypassed)

### Commands
```bash
# Run comprehensive test suite
node testing/puppeteer-scripts/final-comprehensive-test.js

# Run specific goals tests
node testing/puppeteer-scripts/goals-test-suite.js

# Debug page content
node testing/puppeteer-scripts/debug-goals-content.js
```

## Test Coverage

### Goals Page Functionality
- [x] Page load and initial state
- [x] Data display (mock goals and exercises)
- [x] Responsive design (mobile/desktop)
- [x] Performance metrics
- [x] Accessibility checks
- [ ] Goal creation modal (FAILING)
- [ ] Goal selection interaction (FAILING)
- [x] Progress calculations
- [x] UI styling and visual elements

### Next Testing Priorities
1. Fix goal creation modal functionality
2. Fix goal card selection/interaction
3. Add end-to-end goal creation workflow tests
4. Test error handling and edge cases
5. Add visual regression testing

## Issue Tracking

Current issues are tracked in the main todo system and documented in test result JSON files. Major issues:

1. **High Priority**: New Goal modal not opening when button clicked
2. **Medium Priority**: Goal card selection not working properly
3. **Low Priority**: Progress circle detection in automated tests

## File Naming Convention

- `*-test-*.js` - Test scripts
- `*-results.json` - Test result files
- `*-screenshot.png` - Test screenshots
- `debug-*` - Debug and analysis scripts
- `final-*` - Latest/final versions of files