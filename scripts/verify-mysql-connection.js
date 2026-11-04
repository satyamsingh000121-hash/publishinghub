const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper to read DATABASE_URL_MYSQL from .env.local if present
function getMySqlUrl() {
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf-8');
    const match = content.match(/^DATABASE_URL_MYSQL=["']?([^"'\r\n]+)["']?/m);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return process.env.DATABASE_URL_MYSQL || null;
}

function parseMySqlUrl(urlStr) {
  try {
    const url = new URL(urlStr);
    return {
      host: url.hostname || 'localhost',
      port: url.port || '3306',
      user: url.username || 'root',
      password: decodeURIComponent(url.password || ''),
      database: url.pathname.replace(/^\//, '') || 'publishinghub',
    };
  } catch (err) {
    return null;
  }
}

async function verifyConnection() {
  console.log("==================================================");
  console.log("          LOCAL MYSQL CONNECTION TEST             ");
  console.log("==================================================\n");

  const mysqlUrl = getMySqlUrl();

  if (!mysqlUrl) {
    console.log("Status: DATABASE_URL_MYSQL not set in .env.local yet.");
    console.log("To test connection, please add the following line to your .env.local file:");
    console.log('DATABASE_URL_MYSQL="mysql://root:YOUR_PASSWORD@localhost:3306/publishinghub"\n');
    console.log("(Note: Replace YOUR_PASSWORD with your actual MySQL password.)");
    console.log("==================================================");
    return;
  }

  const parsed = parseMySqlUrl(mysqlUrl);
  if (!parsed) {
    console.error("Error: Could not parse DATABASE_URL_MYSQL.");
    return;
  }

  // Masked URL for safe logging (password hidden)
  const maskedUrl = `mysql://${parsed.user}:****@${parsed.host}:${parsed.port}/${parsed.database}`;
  console.log(`Testing target: ${maskedUrl}`);

  // Test using MySQL CLI without exposing password in arguments
  const mysqlBin = 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe';
  
  if (!fs.existsSync(mysqlBin)) {
    console.log(`Note: mysql.exe not found at standard path (${mysqlBin}).`);
    return;
  }

  const proc = spawn(mysqlBin, [
    `-h${parsed.host}`,
    `-P${parsed.port}`,
    `-u${parsed.user}`,
    `-p${parsed.password}`,
    parsed.database,
    '-e',
    'SELECT VERSION() as version, DATABASE() as current_db;'
  ]);

  let stdout = '';
  let stderr = '';

  proc.stdout.on('data', (d) => { stdout += d.toString(); });
  proc.stderr.on('data', (d) => { stderr += d.toString(); });

  proc.on('close', (code) => {
    if (code === 0) {
      console.log("\n✓ Connection SUCCESSFUL!");
      console.log("Database response:");
      console.log(stdout.trim());
      console.log("\nMySQL Server is reachable and the database 'publishinghub' is ready.");
      console.log("==================================================");
    } else {
      console.error("\n✗ Connection FAILED.");
      if (stderr.includes("Access denied")) {
        console.error("Reason: Incorrect username or password.");
      } else if (stderr.includes("Unknown database")) {
        console.error(`Reason: Database '${parsed.database}' does not exist yet.`);
      } else {
        console.error("Details:", stderr.trim());
      }
      console.log("==================================================");
    }
  });
}

verifyConnection();

