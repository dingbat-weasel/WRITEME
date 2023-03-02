const inquirer = require("inquirer");
const fs = require("fs");

inquirer
  .prompt([
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
      name: "diagram",
      message:
        "To add a diagram, create an `assets/images` folder in your repository and upload your diagram to it. Then, write the filepath here.",
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
      name: "credits",
      message:
        "List your collaborators, if any, with links to their GitHub profiles. If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section. If you followed tutorials, include links to those here as well. Tip: To generate a list item, surround each item with html list tags. Ex: <li>item1</li> <li>item2</li>",
    },
    {
      type: "input",
      name: "license",
      message: "License:",
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

        const replaced = contents
          .replace("%title", data.title)
          .replace("%siteLink", data.siteLink)
          .replace("%demoLink", data.demoLink)
          .replace("%description", data.description)
          .replace("%features", data.features)
          .replace("%usage", data.usage)
          .replace("%screenshot", data.screenshot)
          .replace("%diagram", data.diagram)
          .replace("%installation", data.installation)
          .replace("%dependencies", data.dependencies)
          .replace("%credits", data.credits)
          .replace("%license", data.license);

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
