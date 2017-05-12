# How to contribute

We want to keep it as easy as possible to contribute changes that
get things working. There are a few guidelines that we
need contributors to follow so that we can have a chance of keeping on
top of things.

## Getting Started

* Make sure you have a [GitHub account](https://github.com/signup/free)
* Submit a ticket for your issue, assuming one does not already exist.
  * Clearly describe the issue including steps to reproduce when it is a bug.
  * Make sure you fill in the earliest version that you know has the issue.
* Fork the repository on GitHub.
* [Make necessary changes](##Making Changes).
* Write tests to ensure that changes do not broke anything.
* Run _all_ the tests.
* Run eslint to check your codestyle.
* [Push to repository](##Submitting Changes).
* [Make a pull request](https://help.github.com/articles/creating-a-pull-request/).

## Making Changes 

* Create a topic branch from where you want to base your work.
  * This is usually the `master` branch.
  * To quickly create a topic branch based on master; `git checkout -b
    fix/master/my_contribution master`. Please avoid working directly on the
    `master` branch.
* Make commits of logical units.
* Check for unnecessary whitespace with `git diff --check` before committing.
* Check for code style with `yarn eslint-fix` before committing.
* Make sure your commit messages are in the proper format.
* Make sure you have added the necessary tests for your changes.

````
# Commit message template

[Subject]

[Description]

#
# Make sure to answer the following:
# - Why is this change necessary?
# - How does it address the issue?
# - What side effects does this change have?
#

````

## Submitting Changes

* Push your changes to a topic branch in your fork of the repository.
* Submit a pull request to the repository in the neo4j-contrib/cypher-editor.
* Update your issue ticket to mark that you have submitted code and are ready for it to be reviewed (Status: Ready for Merge).
  * Include a link to the pull request in the issue ticket.
* After pull request received. We will review code and give our feedback.

### Important to note
* Changes resulting in test pipeline failures will be reverted if they cannot
  be resolved within one business day.
