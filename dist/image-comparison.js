"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashify = require("dashify");
const protractor_1 = require("protractor");
const result_reporter_1 = require("./result-reporter");
class ImageComparison {
    constructor(config) {
        this.pic = protractor_1.browser.imageComparison;
        config = config || {};
        this.config = { reportPath: config.reportPath || this.pic.folders.baselineFolder };
        this.reporter = new result_reporter_1.ResultReporter(this.config);
    }
    checkPage(testName, protractorImageComparisonOptions) {
        return this.check(testName, true, protractorImageComparisonOptions);
    }
    async checkElement(elementFinder, testName, protractorImageComparisonOptions = {}) {
        return this.check(testName, false, protractorImageComparisonOptions, elementFinder);
    }
    async check(testName, isFullscreen, protractorImageComparisonOptions = {}, elementFinder) {
        const saveAboveTolerance = this.pic.defaultOptions.compareOptions.saveAboveTolerance;
        const testFileName = dashify(testName);
        let compareResult;
        if (isFullscreen) {
            compareResult = await this.pic.checkFullPageScreen(testFileName, protractorImageComparisonOptions);
        }
        else {
            compareResult = await this.pic.checkElement(elementFinder, testFileName, protractorImageComparisonOptions);
        }
        console.log('Class: ImageComparison, Function: check, Line 48 compareResult(): ', compareResult);
        const success = compareResult.misMatchPercentage <= saveAboveTolerance;
        this.reporter.report({
            baselineImage: compareResult.folders.baseline,
            actualImage: compareResult.folders.actual,
            diffImage: compareResult.folders.diff,
            success,
            date: new Date(),
            testName,
            testFileName
        });
        if (!success) {
            fail(`Test ${testName} failed. The mismatch was ${compareResult.misMatchPercentage} percent`);
        }
        return compareResult.misMatchPercentage;
    }
}
exports.ImageComparison = ImageComparison;
//# sourceMappingURL=image-comparison.js.map