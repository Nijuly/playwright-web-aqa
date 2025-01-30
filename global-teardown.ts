import { execSync } from "child_process";
import playwrightConfig from "./playwright.config";

async function globalTeardown() {
  const workersAmount = playwrightConfig.workers;

  for (let i = 0; i < Number(workersAmount); i++) {
    try {
      execSync(`kill -9 $(lsof -t -i :300${i})`);
    } catch (error) {
      console.log(`No process found on port 300${i}`);
    }
  }
}

export default globalTeardown;
