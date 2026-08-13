import { access, cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const standaloneDirectory = path.join(root, ".next", "standalone");
const outputDirectory = path.join(root, ".cpanel-build");

await access(path.join(standaloneDirectory, "server.js"));
await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

await cp(standaloneDirectory, outputDirectory, { recursive: true });
await cp(path.join(root, ".next", "static"), path.join(outputDirectory, ".next", "static"), {
  recursive: true,
});
await cp(path.join(root, "public"), path.join(outputDirectory, "public"), {
  recursive: true,
});
await cp(path.join(root, "content"), path.join(outputDirectory, "content"), {
  recursive: true,
});

console.log(`cPanel deployment bundle created at ${outputDirectory}`);
