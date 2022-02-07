# yaml translator

This project aims to run a script to translate YAML files using [DeepL](https://www.deepl.com/en/quality.html).

<br>

## System requirements

`node=v16.13.2` [(LTS)](https://nodejs.org/en/about/releases/)

<br>

## How to run it

- Install the dependencies
    ```
    $ yarn
    // or
    $ npm i
    ```

- This project uses [dotenv](https://www.npmjs.com/package/dotenv) lib to define sensitive data so you must create a `.env` file at your root directory with the following values:

    ```
    HOST=https://my.deepl.endpoint/translate    // your translator API host
    AUTH_KEY=xxx-yyy-zzz                        // your API auth KEY
    ```

- Open the project and upload the `YAML` file you want to translate at the `translations` folder with the name `language.yaml`

- After the previous steps are configured you just need to run the script, the supported languages list are [available through DeepL API](https://www.deepl.com/docs-api/other-functions/listing-supported-languages/):

    ```
    $ node index.js --from=de --to=en
    ```

    - The `--from` and `--to` values are mandatory

    - The `--from` informs from which language you're coming from

    - The `--to` informs from which language you're translating to

- The expected result can be found at `tmp/final.yml`.

<br>

## Usage example

[![Watch the video](https://i.imgur.com/StY7aHU.png)](https://youtu.be/dWrn_Od2J5I)

