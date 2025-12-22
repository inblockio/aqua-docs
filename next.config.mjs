const mode = process.env.NEXT_BUILD_MODE || "default";

let config;
let target = ""

switch (mode) {
  case "export":
    config = await import("./next.config.export.mjs");
    target = "export"
    break;
  default:
    config = await import("./next.config.default.mjs");
    target = "server"
}

console.log(`Building for target: ${target}`)

export default config.default ?? config;
