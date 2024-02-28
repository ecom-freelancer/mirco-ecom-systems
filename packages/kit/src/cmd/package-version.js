const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function createChangeset(rootDir, version, dir) {
  const timestamp = Date.now();
  const formattedTimestamp = new Date(timestamp)
    .toISOString()
    .replace(/[-:.]/g, '');
  const packages = await getPackagesName(rootDir, dir);
  const fileName = `changeset-version.md`;
  const fileContent = `---\n${packages
    .filter((item) => item !== '@teko-builder/upload-provider') // by pass
    .map((item) => `'${item}': ${version}`)
    .join('\n')}\n---\n${formattedTimestamp} update version`;
  const filePath = path.join(rootDir, '.changeset', fileName);
  await fs.promises.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      return 1;
    } else {
      console.log('File created:', filePath);
      return 0;
    }
  });
}

async function getPackagesName(rootDir, dir) {
  const packageJsonPaths = dir.reduce((prev, currentVal) => {
    return prev.concat(
      fs
        .readdirSync(path.join(rootDir, currentVal), { withFileTypes: true })
        .filter(
          (dirent) =>
            dirent.isDirectory() &&
            fs.existsSync(
              path.join(rootDir, currentVal, dirent.name, 'package.json'),
            ),
        )
        .map((package) =>
          path.join(rootDir, currentVal, package.name, 'package.json'),
        ),
    );
  }, []);

  const packageNames = packageJsonPaths.map((packageJsonPath) => {
    const packageJsonString = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonString);
    return packageJson.name;
  });
  return packageNames;
}

async function versioningPackage(rootDir, version, dir = ['packages']) {
  createChangeset(rootDir, version, dir).then((code) => {
    if (!code) {
      const changesetCommand = `yarn changeset version && yarn install`;
      execSync(changesetCommand, { stdio: 'inherit' });
    }
    return code;
  });
}

module.exports = {
  createChangeset,
  versioningPackage,
};
