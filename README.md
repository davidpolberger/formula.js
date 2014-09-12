formula.js
==========

[![Build Status](https://travis-ci.org/CrowdProcess/formula.js.svg?branch=master)](https://travis-ci.org/CrowdProcess/formula.js)  [![Coverage Status](https://coveralls.io/repos/CrowdProcess/formula.js/badge.png?branch=master)](https://coveralls.io/r/CrowdProcess/formula.js?branch=master)

JavaScript implementation of Microsoft Excel formula functions.

This library is under development.

This was forked from the awesome guys at [sutoiku](https://github.com/sutoiku/formula.js/), the reason being we wanted to do a more agressive refactor, modularize the code, remove formulas that do not exist in Excel and do error handling in a different way.

The `utils.matrix` namespace contains a very small subset of [numeric](https://github.com/sloisel/numeric) functions and dependencies used for the `MINVERSE`, `MMULT`, `MDTERM` and `MUNIT` functions. The whole library was not included because we only use a small subset of it's functionality, and we wanted to be 100% `eval` free.

Small parts of lodash and [numeric](https://github.com/sloisel/numeric) were plucked because we didn't want to include the whole library to just less than 1% of it. It made the builds huge.