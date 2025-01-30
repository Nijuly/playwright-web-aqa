import { ChildProcess, execSync, spawn } from "child_process";

let serverProcess: ChildProcess | null;

async function restartServer(env = {}) {
  try {
    execSync(`kill -9 $(lsof -t -i :300${process.env.TEST_PARALLEL_INDEX})`);
  } catch {
    console.log(
      `No process found on port 300${process.env.TEST_PARALLEL_INDEX}`
    );
  }

  console.log("Starting application...");
  serverProcess = spawn("npx", ["next", "dev", "--turbopack"], {
    env: {
      ...process.env,
      ...env,
      ...{ PORT: `300${process.env.TEST_PARALLEL_INDEX}` },
    },
    stdio: "inherit",
  });

  await new Promise((resolve) => setTimeout(resolve, 30000));
  console.log("Server started successfully!");
}

export { restartServer };
