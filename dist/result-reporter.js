"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const test_result_1 = require("./test-result");
class ResultReporter {
    constructor(config) {
        this.config = {};
        this.config = config;
        this.config.reportPath = this.config.reportPath || 'test-results';
        try {
            fs.mkdirSync(this.config.reportPath);
        }
        catch (ignored) {
            // directory exists, ignore
        }
    }
    async report(result) {
        const testResultFile = path.normalize(path.join(this.config.reportPath, `${result.testFileName}${test_result_1.TEST_RESULT_EXTENSION}`));
        result = Object.assign({}, result, { actualImage: this.toTestResultRelativeFile(testResultFile, result.actualImage), baselineImage: this.toTestResultRelativeFile(testResultFile, result.baselineImage), diffImage: this.toTestResultRelativeFile(testResultFile, result.diffImage) });
        await fs.promises.writeFile(testResultFile, JSON.stringify(result, undefined, 4), 'utf8');
    }
    toTestResultRelativeFile(testResultFileName, fileName) {
        if (!fileName) {
            return undefined;
        }
        /*
            path.relative returns ../actual/start-page-chrome-1050x880-dpr-1.png instead of
            ./actual/start-page-chrome-1050x880-dpr-1.png
        */
        return path.relative(testResultFileName, path.normalize(fileName)).substring(1);
    }
}
exports.ResultReporter = ResultReporter;
//# sourceMappingURL=result-reporter.js.map