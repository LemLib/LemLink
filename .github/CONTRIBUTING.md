<!-- omit in toc -->
# Contributing to LemLink

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Refer this project in your project's readme
> - Mention the project at local meetups with your fellow competitors
> - Mention the use of this project in judging presentations
> - Open a bug report or feature request [here](https://github.com/LemLib/LemLink/issues/new/choose)
> - Discuss and give feedback in our [Discord](https://discord.gg/pCHr7XZUTj)

<!-- omit in toc -->
## Table of Contents

- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
  - [C++ Coding Style](#c-coding-style)
  - [Commit Messages](#commit-messages)


## I Have a Question

> If you want to ask a question, we assume that you have read the available [Documentation](https://lemlib.github.io/LemLink/).

Before you ask a question, it is best to search for existing [Issues](https://github.com/LemLib/LemLink/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. In addition, you can also search for existing questions in the [Vex Discord](https://discord.gg/VUStG8p), the [VEX Forum](https://www.vexforum.com/), or the our [Discord](https://discord.gg/pCHr7XZUTj).


If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/LemLib/LemLink/issues/new).
- Provide as much context as you can about what you're running into.
- Provide OS, Platform, and Version (Windows, Linux, macOS, x86, ARM).
- Provide LemLink version (run `lem -v`).
- Any additional information you think is relevant

We will then take care of the issue as soon as possible.

<!--
You might want to create a separate issue tag for questions and include it in this description. People should then tag their issues accordingly.

Depending on how large the project is, you may want to outsource the questioning, e.g. to Stack Overflow or Gitter. You may add additional contact and information possibilities:
- IRC
- Slack
- Gitter
- Stack Overflow tag
- Blog
- FAQ
- Roadmap
- E-Mail List
- Forum
-->

## I Want To Contribute

> ### Legal Notice <!-- omit in toc -->
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

### Reporting Bugs

<!-- omit in toc -->
#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. (TODO!!!) (Make sure that you have read the [documentation](https://lemlib.github.io/LemLink/). If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](https://github.com/LemLib/LemLink/issues?q=label%3Abug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
  - Possibly your command and the output
  - Can you reliably reproduce the issue? 

<!-- omit in toc -->
#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to .
<!-- You may add a PGP key to allow the messages to be sent encrypted as well. -->

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/LemLib/LemLink/issues/new). Use the Bug Report issue template.
- Explain the behavior you would expect and the actual behavior.
- Provide OS, Platform, and Version (Windows, Linux, macOS, x86, ARM).
- Provide LemLink version (run `lem -v`).
- Provide as much context as you can about what you're running into.
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to recreate the issue on their own. This usually includes your command. For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.
- Provide any additional information you think is relevant, but does not fit previous sections.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs with the `needs-repro` tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked `confirmed-bug`, as well as possibly other tags (such as `p: critical`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).


### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for LemLink, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

<!-- omit in toc -->
#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation](https://lemlib.github.io/LemLink/) carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/LemLib/LemLink/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our users and not just a small subset.

<!-- omit in toc -->
#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/LemLib/LemLink/issues). You can use the Feature Request issue template upon creation of a new issue.

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** so the project team can understand the difference between your suggestion and the current behavior.
- **Explain why this enhancement would be useful** to most LemLink users. You may also want to point out the other projects that solved it better and which could serve as inspiration.
- **(Optional) List possible implementations and alternatives** you have in mind.

<!-- You might want to create an issue template for enhancement suggestions that can be used as a guide and that defines the structure of the information to be included. If you do so, reference it here in the description. -->

### Your First Code Contribution

> Using a development environment different from the one recommended below is fine.

We recommend using [Visual Studio Code](https://code.visualstudio.com/) as your IDE. It is free, open-source, and cross-platform.
Here is a list of recommended extensions:
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) to check for spelling mistakes
- [file-icons](https://marketplace.visualstudio.com/items?itemName=file-icons.file-icons) to display file icons

In order to contribute to LemLink, you will need to 
1. [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the repository and clone it to your local machine. 
2. Then, run `npm i`, to install all dependencies.
3. You can then [commit](#commit-messages) your changes to your fork. 
4. And to generate the executable, for testing, run `npm run build; npm run package`
5. Once you are done, you can [create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) to the master branch. You can use the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md) to structure your pull request.



### Improving The Documentation
<!-- TODO
Updating, improving and correcting the documentation

-->

## Styleguides

### C++ Coding Style

We use eslint to enforce linting rules and prettier to enforce formatting. You can run `npm run clean`, to fix these stylings. 

> [!WARNING]
> We also use a pre-commit hook to prevent any code that doesn't match these style guides from ever being committed.
> 
> To get around this, you can run the commit command from git's cli with `--no-verify`

### Commit Messages
Commit titles should be short and descriptive. They should be written in the imperative mood, i.e. as if you were commanding someone. They should not end with a period. If you are fixing an issue, you should include the issue number in the commit title. Additional information can be provided in the commit body. For example:

```
Add support for Bluetooth (fixes #42)

This commit adds support for a Bluetooth connection to the brain. It also adds a new class called BluetoothConnection.
```

<!-- omit in toc -->
## Attribution
This guide is based on the **contributing-gen**. [Make your own](https://github.com/bttger/contributing-gen)!