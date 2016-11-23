webpack = node_modules/webpack/bin/webpack.js
jshint = node_modules/jshint/bin/jshint
mocha = node_modules/mocha/bin/mocha
coveralls = node_modules/coveralls/bin/coveralls.js

build:
	$(webpack)
	$(webpack) --standalone
	$(webpack) --prod
	$(webpack) --prod --standalone

lint:
	$(jshint) lib/*.js

test:
	# NOTE: mocha-spec-cov does not work ... error is that JSONCov is undefined
	# $(mocha) --ui tdd --reporter mocha-spec-cov --require blanket
	$(mocha) --ui tdd

tdd:
	$(mocha) --ui tdd --reporter min --watch

# NOTE: this rule does not work
watch:
	$(mocha) --ui tdd --reporter mocha-spec-cov --require blanket --watch

# NOTE: this rule does not work
coveralls:
	$(mocha) --require blanket --ui tdd --reporter mocha-lcov-reporter | $(coveralls)

# NOTE: this rule does not work
coverage:
	$(mocha) --ui tdd --reporter html-cov --require blanket > coverage-report.html

package: clean build
	rm -rf *.tgz || true
	npm pack

clean:
	rm -rf build/
	rm -f coverage-report.html

.PHONY: build clean coverage test watch
