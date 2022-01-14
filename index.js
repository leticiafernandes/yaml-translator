// enviroment variables
require("dotenv").config();

// arguments passed to the script
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

// exec();
const yaml = require("js-yaml");
const fs = require("fs");
const axios = require("axios");

const promises = [];

const isElegibleToTranslation = (value) => typeof value === "string";

const shouldBeDestructured = (value) => typeof value === "object";

const applyTranslationForText = (obj, key, text) => {
  const sourceLang = argv.from; // FROM which language we want to translate
  const targetLang = argv.to; // TO which language we want to translate
  const params = `auth_key=${process.env.AUTH_KEY}&text=${text}&target_lang=${targetLang}&source_lang=${sourceLang}`;

  return axios
    .post(`${process.env.HOST}?${params}`)
    .then(function (response) {
      const {
        data: { translations = [] },
      } = response;

      obj[key] = translations[0].text || "";
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

const translate = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    if (!value) continue;

    else if (isElegibleToTranslation(value)) {
      promises.push(applyTranslationForText(obj, key, value));
    } 
    
    else if (shouldBeDestructured(value)) {
      translate(value);
    }
  }

  return Promise.all(promises).then(() => obj);
};

const writeYamlFile = (fileName, data) => {
  const final = yaml.dump(data, { forceQuotes: true, quotingType: '"' });

  fs.writeFile(fileName, final, function (err) {
    if (err) {
      return console.error(err);
    }
    console.log("The file was saved!");
  });
};

const attendsScriptMinimunArguments = argv.from && argv.to;

const exec = () => {
  if (!attendsScriptMinimunArguments) {
    console.error("Please, provide the --from and --to arguments");
    return;
  }

  try {
    console.log("Process started...");
    const doc = yaml.load(
      fs.readFileSync("./translations/language.yml", "utf8")
    );

    console.log("Yaml file loaded...");

    translate(doc)
      .then((data) => {
        console.log(
          "Translations requested... \nWill write the translated file... \n"
        );
        writeYamlFile("./tmp/final.yml", data);
      })
      .catch((err) => console.log(err));
  } catch (e) {
    console.error(e);
  }
};

exec();
