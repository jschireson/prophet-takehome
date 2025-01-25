import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());

// Sample titles for investigations
const investigationTitles = [
  "Suspicious Login Attempts",
  "Malicious Process Execution",
  "Unusual Network Behavior",
  "Unauthorized Access Detected",
  "Potential Data Exfiltration",
  "Anomalous User Activity",
  "Security Policy Violation",
  "Irregular Application Traffic",
  "Ransomware Attack Indicators",
  "Elevated Risk of Phishing",
];

// Sample first and last names for analysts
const firstNames = [
  "Alex",
  "Jordan",
  "Taylor",
  "Morgan",
  "Casey",
  "Riley",
  "Jamie",
  "Robin",
  "Drew",
  "Cameron",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
];

function generateUuid() {
  return crypto.randomUUID();
}

// Function to generate a random analyst name
function generateAnalystName() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

// Function to generate a random date within the last two weeks
function randomDateWithinLastTwoWeeks() {
  const now = new Date();
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  return new Date(
    twoWeeksAgo.getTime() +
      Math.random() * (now.getTime() - twoWeeksAgo.getTime()),
  );
}

function generateInvestigation(id, isNew = false) {
  const now = new Date();
  const alertFiredTimestamp = isNew ? now : randomDateWithinLastTwoWeeks();
  const maxInterval = Math.min(
    now.getTime() - alertFiredTimestamp.getTime(),
    7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  );
  const lastUpdatedTimestamp = isNew
    ? now
    : new Date(alertFiredTimestamp.getTime() + Math.random() * maxInterval);
  const determination = [
    "True positive",
    "False positive",
    "In progress",
    "Closed",
  ][Math.floor(Math.random() * 4)];
  let severity;
  switch (determination) {
    case "False positive":
      // False positives are generally not critical
      severity = "Low";
      break;
    case "True positive":
      // True positives can be of any severity
      severity = ["Low", "Medium", "High", "Critical"][
        Math.floor(Math.random() * 4)
      ];
      break;
    default:
      // For other cases, choose any severity
      severity = ["Low", "Medium", "High", "Critical"][
        Math.floor(Math.random() * 4)
      ];
      break;
  }

  return {
    id,
    title:
      investigationTitles[
        Math.floor(Math.random() * investigationTitles.length)
      ],
    source: ["AWS", "Azure", "Crowdstrike", "SentinelOne", "Okta"][
      Math.floor(Math.random() * 5)
    ],
    alertFiredTimestamp: alertFiredTimestamp.toISOString(),
    lastUpdatedTimestamp: lastUpdatedTimestamp.toISOString(),
    severity,
    analystAssigned: generateAnalystName(),
    determination,
    readyForReview: ["Yes", "No"][Math.floor(Math.random() * 2)],
  };
}

// Function to generate random investigations with realistic logic
function generateInvestigations() {
  const investigations = [];
  for (let i = 0; i < 1000; i++) {
    const investigation = generateInvestigation(generateUuid());
    investigations.push(investigation);
  }
  return investigations;
}

const investigations = generateInvestigations();

// Schedule new investigations to be added every few minutes
const newInvestigationInterval = 10_000; // ~10 seconds, for example
setInterval(function () {
  const investigation = generateInvestigation(generateUuid(), true);
  investigations.push(investigation);
  console.log(`Adding new investigation: ${investigation.id}`);
}, newInvestigationInterval);

// GET /investigations route
app.get("/investigations", (req, res) => {
  // Introduce a 1% chance to fail with a 500 error
  if (Math.random() < 0.01) {
    return res.status(500).send("Internal Server Error");
  }

  const { id, source, severity, determination, page = 1, count } = req.query;
  const pageSize = count || 10;

  const results = investigations
    .filter(
      (inv) =>
        (!source || inv.source === source) &&
        (!severity || inv.severity === severity) &&
        (!id || inv.id === id) &&
        (!determination || inv.determination === determination),
    )
    .sort(
      (a, b) =>
        new Date(b.alertFiredTimestamp) - new Date(a.alertFiredTimestamp),
    );

  // Pagination
  const paginatedResults = results.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return res.json(paginatedResults);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}\n`);
});
