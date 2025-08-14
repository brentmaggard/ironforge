#!/usr/bin/env node

/**
 * Test Runner for Goals Page Tests
 * Provides additional options and pre-flight checks
 */

const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

class TestRunner {
  constructor() {
    this.baseUrl = 'http://localhost:3001';
    this.options = this.parseArguments();
  }

  parseArguments() {
    const args = process.argv.slice(2);
    const options = {
      headless: false,
      url: 'http://localhost:3001',
      timeout: 30000,
      verbose: false,
      skipChecks: false,
      help: false
    };

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      switch (arg) {
        case '--headless':
        case '-h':
          options.headless = true;
          break;
        case '--url':
        case '-u':
          options.url = args[++i];
          break;
        case '--timeout':
        case '-t':
          options.timeout = parseInt(args[++i]);
          break;
        case '--verbose':
        case '-v':
          options.verbose = true;
          break;
        case '--skip-checks':
        case '-s':
          options.skipChecks = true;
          break;
        case '--help':
          options.help = true;
          break;
        default:
          console.log(`Unknown option: ${arg}`);
          break;
      }
    }

    return options;
  }

  showHelp() {
    console.log(`
Goals Page Test Runner

Usage: node run-tests.js [options]

Options:
  --headless, -h          Run in headless mode
  --url, -u <url>         Set base URL (default: http://localhost:3001)
  --timeout, -t <ms>      Set timeout in milliseconds (default: 30000)
  --verbose, -v           Enable verbose output
  --skip-checks, -s       Skip pre-flight checks
  --help                  Show this help message

Examples:
  node run-tests.js                    # Run with browser visible
  node run-tests.js --headless         # Run in headless mode
  node run-tests.js --url http://localhost:3000  # Custom URL
  node run-tests.js --verbose --headless          # Verbose headless mode

Environment Variables:
  HEADLESS=true          Run in headless mode
  BASE_URL=<url>         Set base URL
  CI=true                Automatically enables headless mode
`);
  }

  async checkServerHealth() {
    return new Promise((resolve) => {
      console.log(`🔍 Checking if server is running at ${this.options.url}...`);
      
      const url = new URL(this.options.url);
      const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: '/',
        method: 'GET',
        timeout: 5000
      };

      const req = http.request(options, (res) => {
        if (res.statusCode === 200 || res.statusCode === 302) {
          console.log('✅ Server is responding');
          resolve(true);
        } else {
          console.log(`❌ Server responded with status: ${res.statusCode}`);
          resolve(false);
        }
      });

      req.on('error', (error) => {
        console.log(`❌ Server not reachable: ${error.message}`);
        console.log('   Make sure your application is running with: npm run dev');
        resolve(false);
      });

      req.on('timeout', () => {
        console.log('❌ Server request timed out');
        resolve(false);
      });

      req.end();
    });
  }

  async checkTestFile() {
    const testFile = './test-goals.js';
    if (!fs.existsSync(testFile)) {
      console.log('❌ Test file not found: test-goals.js');
      return false;
    }
    console.log('✅ Test file found');
    return true;
  }

  async runPreflightChecks() {
    console.log('🚀 Running pre-flight checks...\n');
    
    let allChecksPass = true;

    // Check if test file exists
    if (!await this.checkTestFile()) {
      allChecksPass = false;
    }

    // Check server health
    if (!await this.checkServerHealth()) {
      allChecksPass = false;
    }

    // Check goals page specifically
    if (allChecksPass) {
      console.log(`🔍 Checking Goals page at ${this.options.url}/goals...`);
      const goalsUrl = `${this.options.url}/goals`;
      
      try {
        const url = new URL(goalsUrl);
        const options = {
          hostname: url.hostname,
          port: url.port || (url.protocol === 'https:' ? 443 : 80),
          path: url.pathname,
          method: 'GET',
          timeout: 5000
        };

        const goalPageCheck = await new Promise((resolve) => {
          const req = http.request(options, (res) => {
            if (res.statusCode === 200 || res.statusCode === 302) {
              console.log('✅ Goals page is accessible');
              resolve(true);
            } else {
              console.log(`⚠️  Goals page returned status: ${res.statusCode}`);
              resolve(true); // Still proceed, might be auth redirect
            }
          });

          req.on('error', (error) => {
            console.log(`❌ Goals page not accessible: ${error.message}`);
            resolve(false);
          });

          req.on('timeout', () => {
            console.log('❌ Goals page request timed out');
            resolve(false);
          });

          req.end();
        });

        if (!goalPageCheck) {
          allChecksPass = false;
        }
      } catch (error) {
        console.log(`❌ Error checking Goals page: ${error.message}`);
        allChecksPass = false;
      }
    }

    console.log('');
    
    if (allChecksPass) {
      console.log('✅ All pre-flight checks passed!\n');
      return true;
    } else {
      console.log('❌ Some pre-flight checks failed. You can:');
      console.log('   • Fix the issues above');
      console.log('   • Run with --skip-checks to bypass these checks');
      console.log('   • Use --help for more options\n');
      return false;
    }
  }

  async runTests() {
    console.log('🎯 Starting Goals Page Tests');
    console.log('='.repeat(50));
    
    // Set environment variables
    const env = { ...process.env };
    
    if (this.options.headless || env.CI === 'true') {
      env.HEADLESS = 'true';
    }
    
    if (this.options.url !== 'http://localhost:3001') {
      env.BASE_URL = this.options.url;
    }
    
    if (this.options.verbose) {
      env.VERBOSE = 'true';
    }

    // Run the test file
    return new Promise((resolve, reject) => {
      const testProcess = spawn('node', ['test-goals.js'], {
        env,
        stdio: 'inherit'
      });

      testProcess.on('close', (code) => {
        console.log(`\n🏁 Tests completed with exit code: ${code}`);
        
        if (code === 0) {
          console.log('🎉 All tests passed!');
        } else {
          console.log('❌ Some tests failed. Check the output above for details.');
        }
        
        resolve(code);
      });

      testProcess.on('error', (error) => {
        console.error('❌ Failed to start test process:', error);
        reject(error);
      });
    });
  }

  async run() {
    if (this.options.help) {
      this.showHelp();
      return 0;
    }

    // Show configuration
    console.log('🔧 Test Configuration:');
    console.log(`   URL: ${this.options.url}`);
    console.log(`   Mode: ${this.options.headless ? 'Headless' : 'Visible'}`);
    console.log(`   Timeout: ${this.options.timeout}ms`);
    console.log(`   Verbose: ${this.options.verbose ? 'Yes' : 'No'}`);
    console.log(`   Skip Checks: ${this.options.skipChecks ? 'Yes' : 'No'}`);
    console.log('');

    // Run pre-flight checks unless skipped
    if (!this.options.skipChecks) {
      const checksPass = await this.runPreflightChecks();
      if (!checksPass) {
        return 1;
      }
    }

    // Run the actual tests
    try {
      const exitCode = await this.runTests();
      return exitCode;
    } catch (error) {
      console.error('❌ Test execution failed:', error);
      return 1;
    }
  }
}

// Run if called directly
if (require.main === module) {
  const runner = new TestRunner();
  runner.run()
    .then(exitCode => process.exit(exitCode))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = TestRunner;