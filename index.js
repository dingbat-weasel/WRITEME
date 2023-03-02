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
        "If your project has a lot of features, list them here. Start item with asterisk (*) and end with <br> to generate list items.",
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
        "What are the steps required to install your project? Provide step-by-step description of how to get the project running. Start item with asterisk (*) and end with <br> to generate list items.",
    },
    {
      type: "input",
      name: "dependencies",
      message:
        "What are the dependencies required to run the program? Start item with asterisk (*) and end with <br> to generate list items.",
    },
    {
      type: "input",
      name: "credits",
      message:
        "List your collaborators, if any, with links to their GitHub profiles. If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section. If you followed tutorials, include links to those here as well. Start item with asterisk (*) and end with <br> to generate list items.",
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

        const replaced = contents.replaceAll("%description", data.description);

        fs.writeFile(`./output/${filename}`, replaced, "utf-8", (err) => {
          if (err !== null) {
            console.log(`Error writing file: ${err}`);
            return;
          } else {
            console.log(`Successful Write.`);
          }
        });
      });
    });
  });
