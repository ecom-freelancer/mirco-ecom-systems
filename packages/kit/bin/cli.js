#!/usr/bin/env node

const path = require("path");
const { buildPackages, buildPackage } = require("../src/cmd/build-package");
const { watchPackages, watchPackage } = require("../src/cmd/watch-package");
const { versioningPackage } = require("../src/cmd/package-version");

async function main(argv) {
  const [cmdName, ...args] = argv;
  const cwd = process.cwd();

  const startTime = Date.now();
  process.on("beforeExit", () => {
    const elaps = Date.now() - startTime;
    const seconds = Math.ceil(elaps / 1000);
    const mili = elaps % 1000;
    console.log(`Execution in ${seconds > 0 ? `${seconds}s` : ""}${mili}ms`);
  });

  switch (cmdName) {
    case "build-packages":
      const pkgRoot = path.join(cwd, "packages");
      buildPackages(pkgRoot, args).then((code) => {
        process.exit(code);
      });
      break;
    case "build-package":
      buildPackage(path.join(cwd, args[0])).then((code) => {
        if (code !== 0) {
          console.log("Build package failed");
        }
      });
      break;
    case "watch-packages":
      watchPackages(path.join(cwd, "packages")).then((code) => {
        if (code === 1) {
          console.error("Error occurs when watching");
        }
      });
      break;
    case "watch-package":
      watchPackage(path.join(cwd, args[0]));
      break;
    case "package-version":
      const [version, ...packagesDir] = args;
      versioningPackage(
        cwd,
        version,
        packagesDir?.length ? packagesDir : ["packages"]
      );
      break;
    default:
      console.log("build-packages [root of packages] [...list of dir]");
      console.log("build-package [root of package]");
      console.log("watch-packages [root of packages]");
      console.log("watch-package [root of package]");
  }
}

const argv = process.argv.slice(2);
main(argv);
