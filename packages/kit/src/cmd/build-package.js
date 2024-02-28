const fs = require('fs');
const path = require('path');
const { Package } = require('../package');
const { KIT_DIRECTORY } = require('../constants');

/**
 * @param {string} packagesRoot
 * @param {string[]} dirs
 */
async function buildPackages(packagesRoot, dirs = []) {
  /**
   * @type {Package[]}
   */
  const packages = [];

  /**
   * @type {Map<string, Package>}
   */
  const _map = new Map();

  const allDirs = !dirs?.length
    ? await fs.promises.readdir(packagesRoot)
    : dirs;

  for (const pkgDir of allDirs) {
    if (pkgDir === KIT_DIRECTORY) continue;

    // bypass if package is invalid
    try {
      const pkg = new Package(path.join(packagesRoot, pkgDir));
      packages.push(pkg);
      _map.set(pkg.name, pkg);
    } catch (e) {}
  }

  for (let i = 0; i < packages.length; ++i) {
    packages[i].getDependencyNames().forEach((name) => {
      if (_map.has(name)) {
        packages[i].addDependency(_map.get(name));
      }
    });
  }
  const leafPackages = packages.filter((pkg) => pkg.dependencies.size === 0);
  try {
    await Promise.all(leafPackages.map((pkg) => pkg.build()));
    return 0;
  } catch (e) {
    return 1;
  }
}

/**
 * @param {string} dir
 */
async function buildPackage(dir) {
  const pkg = new Package(dir);
  return pkg.build();
}

module.exports = {
  Package,
  buildPackages,
  buildPackage,
};
