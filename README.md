# formulajs
=========

JavaScript implementation of Microsoft Excel formula functions.

## Fork/Branch History
This was forked from 
[davidpolberger fork](https://github.com/davidpolberger/formulajs) 
in October 2016 (although github fork graph doesn't show this anymore!?!?).
That fork was forked from the latest (as of that date) 
[CrowdProcess fork](https://github.com/CrowdProcess/formula.js/). 
That in turn was forked from the 
[root project](https://github.com/sutoiku/formula.js/)
19-Aug-2014.

According to davidpolberger: The CrowdProcess fork is notable primarily for featuring significantly improved
error handling, cutting down on dependencies and excluding functions
which are not offered by Microsoft Excel itself.  
This fork uses Webpack (like the original formula.js) and features a
package information file for the Bower dependency management system as
well as pre-built distribution files. There is also a fair number of
bug fixes.

## Goals
This fork strives to conform the behavior of the functions closer to Excel.
And, to include tests that demonstrate this conformance.

Note that in some cases it is not clear what a function should do.  For example,
Excel does not allow a cell to be set to call a function that is missing a required
parameter.  What should a function in this library do when such a parameter
is missing (undefined)?  Since this cannot happen in Excel, we are free to choose any behavior
without _conflicting_ with Excel.  This library's function can provide _extended_
behavior.  

For a missing parameter that in Excel is required, one option is to throw an exception indicating that a
parameter is missing.  But, in many (all?) cases there is a logical/meaningful 
value that can be returned.  For example COUNT() can return 0.  And, AVERAGE()
can return the div0 error.  One might ask: why not throw an exception
instead of returning an error object?  One response is that you can, in fact,
call AVERAGE with no numbers and get div0.  For example: AVERAGE(['x']) or in Excel AVERAGE({"x"}).
