const fs = require("fs");

const outputErrors = (translationErrors) => {
  console.log("######################################################");
  console.log(`TOTAL ERRORS: ${translationErrors.length}`);
  console.log("Please check the segments with error at: tmp/error.txt");
  console.log("######################################################");
};

const writeErrorFile = (translationErrors) => {
  if (!translationErrors.length) return;
  fs.writeFileSync("./tmp/error.txt", translationErrors.join("\n"));
  outputErrors(translationErrors);
};

module.exports = writeErrorFile;
