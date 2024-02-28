const fs = require('fs');
const path = require('path');
const { KIT_DIRECTORY } = require('../constants');
const { Package } = require('../package');

/**
 * @param {string} packagesRoot
 */
async function watchPackages(packagesRoot) {
  /**
   * @type {Package[]}
   */
  const packages = [];

  /**
   * @type {Map<string, Package>}
   */
  const _map = new Map();

  for (const pkgDir of await fs.promises.readdir(packagesRoot)) {
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

  try {
    await Promise.all(packages.map((pkg) => pkg.watch()));
    return 0;
  } catch (e) {
    console.error(e);
    return 1;
  }
}

/**
 * @param {string} dir
 */
async function watchPackage(dir) {
  const pkg = new Package(dir);
  return pkg.watch();
}

module.exports = {
  watchPackages,
  watchPackage,
};
