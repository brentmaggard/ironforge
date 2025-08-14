const fs = require('fs');
const path = require('path');

class IssueManager {
  constructor() {
    this.todoFilePath = path.join(process.cwd(), 'goals-issues.json');
    this.fixLogPath = path.join(process.cwd(), 'fix-log.md');
    this.issues = [];
    this.fixLog = [];
  }

  loadIssuesFromTestReport(reportPath = 'goals-test-report.json') {
    try {
      if (fs.existsSync(reportPath)) {
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        this.issues = report.issues.map((issue, index) => ({
          id: `GOAL-${String(index + 1).padStart(3, '0')}`,
          status: 'open',
          createdAt: issue.timestamp,
          ...issue
        }));
        this.saveIssues();
        console.log(`✅ Loaded ${this.issues.length} issues from test report`);
        return this.issues.length;
      }
    } catch (error) {
      console.error('❌ Error loading test report:', error.message);
      return 0;
    }
  }

  saveIssues() {
    fs.writeFileSync(this.todoFilePath, JSON.stringify(this.issues, null, 2));
  }

  loadExistingIssues() {
    try {
      if (fs.existsSync(this.todoFilePath)) {
        this.issues = JSON.parse(fs.readFileSync(this.todoFilePath, 'utf8'));
        return this.issues.length;
      }
    } catch (error) {
      console.error('❌ Error loading existing issues:', error.message);
    }
    return 0;
  }

  generateFixPlan() {
    const highPriorityIssues = this.issues.filter(i => i.priority === 'high' && i.status === 'open');
    const mediumPriorityIssues = this.issues.filter(i => i.priority === 'medium' && i.status === 'open');
    const lowPriorityIssues = this.issues.filter(i => i.priority === 'low' && i.status === 'open');

    console.log('\n🎯 ISSUE FIX PLAN');
    console.log('==================');
    
    if (highPriorityIssues.length > 0) {
      console.log(`\n🔥 HIGH PRIORITY ISSUES (${highPriorityIssues.length}) - Fix these first:`);
      highPriorityIssues.forEach((issue, index) => {
        console.log(`${index + 1}. [${issue.id}] ${issue.title}`);
        console.log(`   ${issue.description}`);
        console.log(`   Test: ${issue.test || 'N/A'}`);
        console.log('');
      });
    }

    if (mediumPriorityIssues.length > 0) {
      console.log(`\n⚠️  MEDIUM PRIORITY ISSUES (${mediumPriorityIssues.length}) - Fix after high priority:`);
      mediumPriorityIssues.forEach((issue, index) => {
        console.log(`${index + 1}. [${issue.id}] ${issue.title}`);
        console.log(`   ${issue.description}`);
        console.log('');
      });
    }

    if (lowPriorityIssues.length > 0) {
      console.log(`\n📝 LOW PRIORITY ISSUES (${lowPriorityIssues.length}) - Polish items:`);
      lowPriorityIssues.forEach((issue, index) => {
        console.log(`${index + 1}. [${issue.id}] ${issue.title}`);
      });
    }

    return {
      high: highPriorityIssues,
      medium: mediumPriorityIssues,
      low: lowPriorityIssues
    };
  }

  markIssueInProgress(issueId) {
    const issue = this.issues.find(i => i.id === issueId);
    if (issue) {
      issue.status = 'in_progress';
      issue.startedAt = new Date().toISOString();
      this.saveIssues();
      console.log(`🔄 [${issueId}] marked as IN PROGRESS`);
      return issue;
    }
    return null;
  }

  markIssueCompleted(issueId, fixDescription = '') {
    const issue = this.issues.find(i => i.id === issueId);
    if (issue) {
      issue.status = 'completed';
      issue.completedAt = new Date().toISOString();
      issue.fixDescription = fixDescription;
      this.saveIssues();
      
      // Add to fix log
      this.addToFixLog(issue, fixDescription);
      
      console.log(`✅ [${issueId}] marked as COMPLETED`);
      return issue;
    }
    return null;
  }

  addToFixLog(issue, fixDescription) {
    const logEntry = {
      issueId: issue.id,
      title: issue.title,
      priority: issue.priority,
      fixDescription,
      completedAt: issue.completedAt
    };
    
    this.fixLog.push(logEntry);
    this.saveFixLog();
  }

  saveFixLog() {
    const markdown = this.generateFixLogMarkdown();
    fs.writeFileSync(this.fixLogPath, markdown);
  }

  generateFixLogMarkdown() {
    const header = `# Goals Page Fix Log\n\nGenerated: ${new Date().toISOString()}\n\n`;
    
    if (this.fixLog.length === 0) {
      return header + 'No fixes completed yet.\n';
    }

    let content = header;
    
    this.fixLog.forEach((fix, index) => {
      content += `## Fix #${index + 1}: ${fix.title}\n\n`;
      content += `- **Issue ID:** ${fix.issueId}\n`;
      content += `- **Priority:** ${fix.priority.toUpperCase()}\n`;
      content += `- **Completed:** ${new Date(fix.completedAt).toLocaleString()}\n\n`;
      content += `### Fix Description:\n${fix.fixDescription}\n\n`;
      content += '---\n\n';
    });
    
    return content;
  }

  getIssuesByStatus(status = 'open') {
    return this.issues.filter(i => i.status === status);
  }

  getNextIssueToFix() {
    // Get highest priority open issue
    const priorities = ['high', 'medium', 'low'];
    
    for (const priority of priorities) {
      const issue = this.issues.find(i => i.priority === priority && i.status === 'open');
      if (issue) {
        return issue;
      }
    }
    
    return null;
  }

  generateTodoListForClaude() {
    const openIssues = this.getIssuesByStatus('open');
    
    console.log('\n📋 TODO LIST FOR CLAUDE:');
    console.log('========================');
    
    if (openIssues.length === 0) {
      console.log('🎉 No open issues! All tests passing.');
      return;
    }

    console.log('Copy these todos to use with TodoWrite:\n');
    
    openIssues.forEach(issue => {
      const priority = issue.priority === 'high' ? '🔥' : issue.priority === 'medium' ? '⚠️' : '📝';
      console.log(`${priority} [${issue.id}] ${issue.title}`);
      console.log(`Description: ${issue.description}`);
      if (issue.test) console.log(`Test: ${issue.test}`);
      console.log(`Priority: ${issue.priority}`);
      console.log('---');
    });
  }

  getProgressSummary() {
    const total = this.issues.length;
    const completed = this.issues.filter(i => i.status === 'completed').length;
    const inProgress = this.issues.filter(i => i.status === 'in_progress').length;
    const open = this.issues.filter(i => i.status === 'open').length;
    
    const progress = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
    
    return {
      total,
      completed,
      inProgress,
      open,
      progress: `${progress}%`
    };
  }

  printProgressSummary() {
    const summary = this.getProgressSummary();
    
    console.log('\n📊 PROGRESS SUMMARY');
    console.log('===================');
    console.log(`Total Issues: ${summary.total}`);
    console.log(`Completed: ${summary.completed}`);
    console.log(`In Progress: ${summary.inProgress}`);
    console.log(`Remaining: ${summary.open}`);
    console.log(`Progress: ${summary.progress}`);
    
    if (summary.total > 0) {
      const progressBar = '█'.repeat(Math.floor(parseFloat(summary.progress) / 5));
      const emptyBar = '░'.repeat(20 - progressBar.length);
      console.log(`Progress: [${progressBar}${emptyBar}] ${summary.progress}`);
    }
  }

  // Batch operations for common issue types
  getBatchFixSuggestions() {
    const issues = this.getIssuesByStatus('open');
    const batches = {
      formValidation: [],
      uiElements: [],
      dataHandling: [],
      styling: [],
      functionality: []
    };

    issues.forEach(issue => {
      const title = issue.title.toLowerCase();
      const description = issue.description.toLowerCase();
      
      if (title.includes('validation') || description.includes('validation')) {
        batches.formValidation.push(issue);
      } else if (title.includes('missing') && (title.includes('button') || title.includes('input'))) {
        batches.uiElements.push(issue);
      } else if (title.includes('not found') || title.includes('element')) {
        batches.uiElements.push(issue);
      } else if (description.includes('style') || description.includes('highlight')) {
        batches.styling.push(issue);
      } else if (title.includes('not working') || title.includes('failed') || title.includes('error')) {
        batches.functionality.push(issue);
      } else {
        batches.dataHandling.push(issue);
      }
    });

    console.log('\n🔧 BATCH FIX SUGGESTIONS');
    console.log('========================');
    
    Object.entries(batches).forEach(([category, categoryIssues]) => {
      if (categoryIssues.length > 0) {
        console.log(`\n${category.toUpperCase()} (${categoryIssues.length} issues):`);
        categoryIssues.forEach(issue => {
          console.log(`  - [${issue.id}] ${issue.title}`);
        });
      }
    });

    return batches;
  }
}

// CLI Interface for Issue Management
class IssueManagerCLI {
  constructor() {
    this.manager = new IssueManager();
  }

  async run() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
      case 'load':
        await this.loadFromTestReport(args[1]);
        break;
      case 'plan':
        await this.showFixPlan();
        break;
      case 'start':
        await this.startFix(args[1]);
        break;
      case 'complete':
        await this.completeFix(args[1], args.slice(2).join(' '));
        break;
      case 'status':
        await this.showStatus();
        break;
      case 'todo':
        await this.generateTodoList();
        break;
      case 'batch':
        await this.showBatchSuggestions();
        break;
      case 'next':
        await this.showNextIssue();
        break;
      default:
        this.showHelp();
    }
  }

  async loadFromTestReport(reportPath) {
    const count = this.manager.loadIssuesFromTestReport(reportPath);
    if (count > 0) {
      this.manager.printProgressSummary();
      console.log('\n✅ Issues loaded successfully. Run "node issue-manager.js plan" to see fix plan.');
    }
  }

  async showFixPlan() {
    this.manager.loadExistingIssues();
    const plan = this.manager.generateFixPlan();
    
    if (plan.high.length === 0 && plan.medium.length === 0 && plan.low.length === 0) {
      console.log('🎉 No open issues found!');
    }
  }

  async startFix(issueId) {
    this.manager.loadExistingIssues();
    const issue = this.manager.markIssueInProgress(issueId);
    
    if (issue) {
      console.log(`\n🔧 FIXING: ${issue.title}`);
      console.log(`Description: ${issue.description}`);
      if (issue.test) console.log(`Related Test: ${issue.test}`);
      console.log('\nOnce fixed, run: node issue-manager.js complete ' + issueId + ' "description of fix"');
    } else {
      console.log(`❌ Issue ${issueId} not found`);
    }
  }

  async completeFix(issueId, fixDescription) {
    this.manager.loadExistingIssues();
    const issue = this.manager.markIssueCompleted(issueId, fixDescription);
    
    if (issue) {
      console.log(`\n🎉 Issue fixed successfully!`);
      this.manager.printProgressSummary();
      
      const nextIssue = this.manager.getNextIssueToFix();
      if (nextIssue) {
        console.log(`\n🔄 Next issue to fix: [${nextIssue.id}] ${nextIssue.title}`);
        console.log('Run: node issue-manager.js start ' + nextIssue.id);
      }
    } else {
      console.log(`❌ Issue ${issueId} not found`);
    }
  }

  async showStatus() {
    this.manager.loadExistingIssues();
    this.manager.printProgressSummary();
    
    const inProgress = this.manager.getIssuesByStatus('in_progress');
    if (inProgress.length > 0) {
      console.log('\n🔄 Currently in progress:');
      inProgress.forEach(issue => {
        console.log(`  [${issue.id}] ${issue.title}`);
      });
    }
  }

  async generateTodoList() {
    this.manager.loadExistingIssues();
    this.manager.generateTodoListForClaude();
  }

  async showBatchSuggestions() {
    this.manager.loadExistingIssues();
    this.manager.getBatchFixSuggestions();
  }

  async showNextIssue() {
    this.manager.loadExistingIssues();
    const nextIssue = this.manager.getNextIssueToFix();
    
    if (nextIssue) {
      console.log(`\n🎯 NEXT ISSUE TO FIX:`);
      console.log(`[${nextIssue.id}] ${nextIssue.title}`);
      console.log(`Priority: ${nextIssue.priority.toUpperCase()}`);
      console.log(`Description: ${nextIssue.description}`);
      if (nextIssue.test) console.log(`Test: ${nextIssue.test}`);
      console.log(`\nTo start: node issue-manager.js start ${nextIssue.id}`);
    } else {
      console.log('🎉 No open issues remaining!');
    }
  }

  showHelp() {
    console.log('\n🛠️  GOALS ISSUE MANAGER');
    console.log('========================');
    console.log('Commands:');
    console.log('  load [report-file]     Load issues from test report');
    console.log('  plan                   Show fix plan by priority');
    console.log('  start <issue-id>       Mark issue as in progress');
    console.log('  complete <issue-id>    Mark issue as completed');
    console.log('    "fix description"');
    console.log('  status                 Show progress summary');
    console.log('  todo                   Generate TODO list for Claude');
    console.log('  batch                  Show batch fix suggestions');
    console.log('  next                   Show next issue to fix');
    console.log('');
    console.log('Examples:');
    console.log('  node issue-manager.js load goals-test-report.json');
    console.log('  node issue-manager.js start GOAL-001');
    console.log('  node issue-manager.js complete GOAL-001 "Added missing data-testid attribute"');
  }
}

// Usage examples and helper functions
function createPackageJsonScript() {
  const scripts = {
    "test:goals": "node goals-test-suite.js",
    "issues:load": "node issue-manager.js load",
    "issues:plan": "node issue-manager.js plan", 
    "issues:status": "node issue-manager.js status",
    "issues:todo": "node issue-manager.js todo",
    "issues:next": "node issue-manager.js next"
  };

  console.log('\n📦 Add these scripts to your package.json:');
  console.log(JSON.stringify(scripts, null, 2));
}

// Export classes
module.exports = { IssueManager, IssueManagerCLI };

// Run CLI if called directly
if (require.main === module) {
  const cli = new IssueManagerCLI();
  cli.run().catch(console.error);
}