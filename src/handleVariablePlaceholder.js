const {
  VARIABLE_PLACEHOLDER_REGEX,
  TEMPORARY_VARIABLE_PLACEHOLDER,
} = require("./ultils/constants");

const getVariablePlaceholders = (text) =>
  text.match(VARIABLE_PLACEHOLDER_REGEX) || [];

const includeVariablePlaceHolders = (placeholders, text) => {
  return placeholders.reduce(
    (acc, variable) => acc.replace(TEMPORARY_VARIABLE_PLACEHOLDER, variable),
    text
  );
};

const removeVariablePlaceHolders = (text) =>
  text.replace(VARIABLE_PLACEHOLDER_REGEX, TEMPORARY_VARIABLE_PLACEHOLDER);

module.exports = {
  getVariablePlaceholders,
  includeVariablePlaceHolders,
  removeVariablePlaceHolders,
};
