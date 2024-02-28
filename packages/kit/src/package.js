const fs = require('fs');
const path = require('path');
const { Observable, Observer } = require('./observer');
const { PackageBuilder } = require('./package-builder');
const { PACKAGE_BUILD_CONFIG_NAME } = require('./constants');

/**
 * @implements {Observer}
 */
class Package extends Observable {
  /**
   * @param {string} root
   */
  constructor(root) {
    super();

    this.root = root;

    this.name = '';

    /**
     * @type {import('rollup').RollupOptions}
     */
    this.config = {};

    /**
     * @type {Set<Package>}
     */
    this.dependencies = new Set();

    /**
     * raw package.json file
     * @type {Object}
     * @property {string} name
     * @property {Object} dependencies
     * @property {Object} devDependencies
     */
    this.packageJson = {};

    this.loadMetadata();

    this.builder = new PackageBuilder(root, this.config);

    this.name = this.packageJson.name;
  }

  /**
   * @private
   */
  loadMetadata() {
    const packageJsonPath = path.join(this.root, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found');
    }

    const configPath = path.join(this.root, PACKAGE_BUILD_CONFIG_NAME);
    if (!fs.existsSync(configPath)) {
      throw new Error(`${PACKAGE_BUILD_CONFIG_NAME} not found`);
    }

    this.packageJson = readJson(packageJsonPath);
    this.config = require(configPath);
  }

  /**
   * @returns {string[]}
   */
  getDependencyNames() {
    return Object.keys(this.packageJson.dependencies || {})
      .concat(Object.keys(this.packageJson.devDependencies || {}))
      .filter(
        (name) => name.startsWith('@teko-builder') || name.startsWith('@tempi'),
      );
  }

  /**
   * @param {Package} dependency
   */
  addDependency(dependency) {
    this.dependencies.add(dependency);
    dependency.addObserver(this);
  }

  /**
   *
   * @param {Observable} o
   */
  async update(o) {
    this.dependencies.delete(o);
    if (this.dependencies.size === 0) {
      await this.build();
    }
  }

  async build() {
    console.log(`Compiling ${this.name}...`);
    try {
      await this.builder.build();
      await this.notifyObservers();
      return 0;
    } catch (e) {
      console.error(`Error occurs when compiling ${this.name}: ${e}`);
      throw e;
    }
  }

  async watch() {
    console.log(`Watching ${this.name}...`);
    return this.builder.watch(this.name);
  }
}

/**
 * @param {string} filename
 * @returns {Object}
 */
function readJson(filename) {
  const content = fs.readFileSync(filename);
  const json = JSON.parse(content.toString());
  return json;
}

module.exports = {
  Package,
};
