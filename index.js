#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk').default;
const { createProject } = require('./utils');

const program = new Command();

program
  .name('nodejs-backend-starter')
  .description('CLI to generate node.js backend starter templates')
  .version('1.0.0');

program
  .argument('<project-name>', 'Name of the project')
  .option('-t, --template <name>', 'Template name (default: express-mongo)')
  .action(async (projectName, options) => {
    try {
      const template = options.template || 'express-mongo';
      await createProject(projectName, template);
      console.log(chalk.green('🚀 Project successfully created!'));
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
    }
  });

program.parse(process.argv);
