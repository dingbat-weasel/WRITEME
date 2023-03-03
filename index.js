const inquirer = require("inquirer");
const fs = require("fs");

inquirer
  .prompt([
    {
      type: "input",
      name: "intro",
      message:
        "Welcome to WRITEME, a CLI README generator running on node and inquirer. Responses to the following prompts will be used to dynamically generate a README file in the 'outputs' directory. For images, double check filepath is absolute or correct relative to where README's final location is in your repo. After file is finished cooking feel free to season to your taste. Press Return to begin.",
    },
    {
      type: "input",
      name: "title",
      message: "Title of the project:",
    },
    {
      type: "input",
      name: "siteLink",
      message: "Enter url to published site if applicable:",
    },
    {
      type: "input",
      name: "demoLink",
      message: "Enter url to live demo if applicable:",
    },
    {
      type: "input",
      name: "description",
      message:
        "Write a description of the project. What was your motivation? Why did you build this project? What problem does it solve? What did you learn?",
    },
    {
      type: "input",
      name: "features",
      message:
        "If your project has a lot of features, list them here. Tip: To generate a list item, surround each item with html list tags. Ex: <li>item1</li>",
    },
    {
      type: "input",
      name: "usage",
      message: "Provide instructions and examples for use:",
    },
    {
      type: "input",
      name: "screenshot",
      message:
        "To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, write the filepath here.",
    },
    {
      type: "input",
      name: "installation",
      message:
        "What are the steps required to install your project? Provide step-by-step description of how to get the project running. Tip: To generate a list item, surround each item with html list tags. Ex: <li>item1</li> <li>item2</li>",
    },
    {
      type: "input",
      name: "dependencies",
      message:
        "What are the dependencies required to run the program? Tip: To generate a list item, surround each item with html list tags. Ex: <li>item1</li> <li>item2</li>",
    },
    {
      type: "input",
      name: "contribute",
      message: "What are the contribution guidelines for your project?",
    },
    {
      type: "input",
      name: "test",
      message: "What are the instructions for testing?",
    },
    {
      type: "input",
      name: "credits",
      message:
        "List your collaborators, if any, with links to their GitHub profiles. If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section. If you followed tutorials, include links to those here as well. Tip: To generate a list item, surround each item with html list tags. Ex: <li>item1</li> <li>item2</li>",
    },
    {
      type: "input",
      name: "github",
      message: "What is your github username?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?",
    },
    {
      type: "list",
      name: "license",
      message: "License:",
      choices: [
        "Apache License 2.0",
        "GNU General Public License v3.0",
        "MIT License",
        'BSD 2-Clause "Simplified" License',
        'BSD 3-Clause "New or "Revised" License',
        "Boost Software License 1.0",
        "Creative Commons Zero v1.0 Universal",
        "Eclipse Public License 2.0",
        "GNU Affero General Public License v3.0",
        "GNU General Public License v2.0",
        "GNU Lesser General Public License v3.0",
        "Mozilla Public License 2.0",
        "The Unlicense",
        "n/a",
      ],
    },
  ])
  .then((data) => {
    const filename = `${data.title
      .toLowerCase()
      .split(" ")
      .join("+")}_README.md`;

    fs.copyFile("template.md", `./output/${filename}`, (err) => {
      if (err) {
        console.log(`Error found: ${err}`);
      } else {
        console.log(`Successful Copy.`);
      }

      fs.readFile(`./output/${filename}`, "utf-8", (err, contents) => {
        if (err) {
          console.log(`Error reading file: ${err}`);
          return;
        } else {
          console.log(`Successful Read.`);
        }

        switch (data.license) {
          case "Apache License 2.0":
            badgeLicense =
              "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            break;
          case "GNU General Public License v3.0":
            badgeLicense =
              "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            break;
          case "MIT License":
            badgeLicense =
              "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;
          case 'BSD 2-Clause "Simplified" License':
            badgeLicense =
              "[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
            break;
          case 'BSD 3-Clause "New or "Revised" License':
            badgeLicense =
              "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
            break;
          case "Boost Software License 1.0":
            badgeLicense =
              "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
            break;
          case "Creative Commons Zero v1.0 Universal":
            badgeLicense =
              "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)";
            break;
          case "Eclipse Public License 2.0":
            badgeLicense =
              "[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)";
            break;
          case "GNU Affero General Public License v3.0":
            badgeLicense =
              "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
            break;
          case "GNU General Public License v2.0":
            badgeLicense =
              "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
            break;
          case "GNU Lesser General Public License v3.0":
            badgeLicense =
              "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
            break;
          case "Mozilla Public License 2.0":
            badgeLicense =
              "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
            break;
          case "The Unlicense":
            badgeLicense =
              "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
            break;
          case "n/a":
            badgeLicense = "No License";
            break;
        }

        const replaced = contents
          .replace("%title", data.title)
          .replace("%siteLink", data.siteLink)
          .replace("%demoLink", data.demoLink)
          .replace("%description", data.description)
          .replace("%features", data.features)
          .replace("%usage", data.usage)
          .replace("%screenshot", data.screenshot)
          .replace("%installation", data.installation)
          .replace("%dependencies", data.dependencies)
          .replace("%contribute", data.contribute)
          .replace("%test", data.test)
          .replace("%credits", data.credits)
          .replace("%github", data.github)
          .replace("%email", data.email)
          .replace("%license", data.license)
          .replace("%badgeLicense", badgeLicense);

        fs.writeFile(`./output/${filename}`, replaced, "utf-8", (err) => {
          if (err === null) {
            console.log(`Successful Write.`);
            return;
          } else {
            console.log(`Error writing file: ${err}`);
          }
        });
      });
    });
  });
