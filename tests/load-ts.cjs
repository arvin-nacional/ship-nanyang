const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");

// Run the real TS modules with isolated Clerk/MongoDB/Next adapters. No live
// accounts or database are touched, and no additional test runtime is needed.
function loadModule(relativePath, mocks = {}, cache = new Map()) {
  const filename = path.resolve(root, relativePath);
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} };
  cache.set(filename, module);
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;
  const localRequire = (name) => {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    if (name === "server-only") return {};
    if (name.startsWith("@/components/")) return () => null;
    if (name.startsWith(".") || name.startsWith("@/")) {
      const base = name.startsWith("@/")
        ? path.join(root, name.slice(2))
        : path.resolve(path.dirname(filename), name);
      const resolved = [base, base + ".ts", base + ".tsx"].find(
        (candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()
      );
      return loadModule(path.relative(root, resolved), mocks, cache);
    }
    return require(name);
  };
  vm.runInThisContext(
    "(function(require, module, exports) {" + source + "\n})",
    { filename }
  )(localRequire, module, module.exports);
  return module.exports;
}

module.exports = { loadModule };
