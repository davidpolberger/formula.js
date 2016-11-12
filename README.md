# formulajs

JavaScript implementation of Microsoft Excel formula functions.

## Fork/Branch History
This was forked from [davidpolberger fork](https://github.com/davidpolberger/formulajs) in October 2016 (although github fork graph doesn't show this anymore!?!?). That fork was forked from the latest (as of that date) [CrowdProcess fork](https://github.com/CrowdProcess/formula.js/). That in turn was forked from the [root project](https://github.com/sutoiku/formula.js/) 19-Aug-2014.

According to davidpolberger: The CrowdProcess fork is notable primarily for featuring significantly improved error handling, cutting down on dependencies and excluding functions which are not offered by Microsoft Excel itself.  This fork uses Webpack (like the original formula.js) and features a package information file for the Bower dependency management system as well as pre-built distribution files. There is also a fair number of bug fixes.

There are quite a number of other branches/forks of this project/library and sadly, it seems that progress is therefore fractured -- advancing independently, separately and uncoordinated.   If you have any suggestions for unifying efforts please share.

## Goals

Primarily, this fork is about conforming the behavior of the functions closer to Excel, and  to include tests that demonstrate this conformance.

Note that in some cases it is not clear what a function should do in order to conform to Excel.  For example, Excel does not allow a cell to be set to call a function that is missing a required parameter.  What should a function in this library do when such a parameter is missing (undefined)?  Since this cannot happen in Excel, we are free to choose any behavior without _conflicting_ with Excel.  This library's function can provide _extended_ behavior.  One goal is to document what behavior of each fucntion is extended -- beyond the functionality in Excel.

For a missing parameter that in Excel is required, one option is to throw an exception indicating that a parameter is missing.  But, in many (all?) cases there is a logical/meaningful value that can be returned.  For example, COUNT() can return 0.  And, AVERAGE() can return the div0 error.  One might ask: why not throw an exception instead of returning an error object?  One response is that you can, in fact, call AVERAGE with no numbers and get div0.  For example: AVERAGE(['x']) or in Excel AVERAGE({"x"}).

## Progress

### Handle variable length parameters more like Excel does

For functions that take a variable number of parameters, the code was flattening all array arguments recursively into a flat array.  But, Excel only allows non-array arguments and array arguments -- not array of array arguments ... or deeper.  Further, Excel treats the non-array arguments differently than the items of an array argument.  Generally, if the non-array argument is invalid, then the function returns an error object.  But, the function ignores an array argument item that is invalid.  

NOTE: work on this implemented for some functions, but not all.

### Handle criteria more like Excel

The functions that take a criteria -- like COUNTIF and COUNTIFS -- were evaluating the criteria expression as javascript, but it's not.  Excel evaluates it using a much simpler syntax than javascript.  For example, "=1+2" matches on "1+2" -- not "3".  The evaluator has been replaced with new, custom code.  

TODO: still need to implement wildcard matching (* and ?).

### Enhance date/time functions

Many changes were implemented in date/time functions to conform to Excel.

### Enhance date/time tests to use more realistic dates

Many tests used dates in 1900.  These are valid dates, but are too edge case.  It's good to test edge cases, but most tests should use inputs that are more normal.  So, many tests were changed to use more current dates.

### Add behavior description text for tests

The tests were well organized, but rather mysterious in there intension and intertwined such that if one behavior of the function failed, then subsequent tests for that function would not run.  Tests have been split into behaviors -- with each given descriptive text.  So, if a test fails, it should be much more clear what is broken.

TODO: This is only partially implemented.
