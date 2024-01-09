formulajs
=========

JavaScript implementation of Microsoft Excel formula functions.

This is a straight-forward fork of the Crowd Process fork of
[formula.js](https://github.com/sutoiku/formula.js/). The Crowd
Process fork is notable primarily for featuring significantly improved
error handling, cutting down on dependencies and excluding functions
which are not offered by Microsoft Excel itself. (It has since been
removed from GitHub.)

This fork uses Webpack (like the original formula.js) and features a
package information file for the Bower dependency management system as
well as pre-built distribution files. There are also a fair number of
bug fixes.

There is [a new fork](https://github.com/formulajs/formulajs) of
formulajs. It makes a number of changes which we find undesirable,
including removing matrix functions (MDETERM, MINVERSE, MMULT and
MUNIT), changing the date representation from the sequential serial
numbers offered by spreadsheets to plain JavaScript `Date` objects and
revamping error handling.
