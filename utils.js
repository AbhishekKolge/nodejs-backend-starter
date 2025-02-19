const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const chalk = require('chalk').default;
const { promisify } = require('util');

const execAsync = promisify(exec);

async function createProject(projectName, template) {
  const templateDir = path.join(__dirname, 'templates', template);
  const targetDir = path.resolve(process.cwd(), projectName);

  // Validate template
  if (!fs.existsSync(templateDir)) {
    throw new Error(`⚠️ Template "${template}" does not exist.`);
  }

  // Copy template files
  await fs.copy(templateDir, targetDir);

  // Replace placeholders in package.json
  const packagePath = path.join(targetDir, 'package.json');
  const packageContent = JSON.parse(await fs.readFile(packagePath, 'utf-8'));
  packageContent.name = projectName;
  await fs.writeFile(packagePath, JSON.stringify(packageContent, null, 2));

  // Install dependencies
  console.log(chalk.blue('🕑 Installing dependencies...'));
  await execAsync('pnpm install', { cwd: targetDir });

  console.log(
    chalk.green(`✅ Project "${projectName}" created at ${targetDir}`)
  );
}

module.exports = { createProject };
