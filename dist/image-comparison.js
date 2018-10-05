"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashify = require("dashify");
const protractor_1 = require("protractor");
const result_reporter_1 = require("./result-reporter");
class ImageComparison {
    constructor(config) {
        this.pic = protractor_1.browser.protractorImageComparison;
        config = config || {};
        this.config = { reportPath: config.reportPath || this.pic.baseFolder };
        this.reporter = new result_reporter_1.ResultReporter(this.config);
    }
    checkPage(testName, protractorImageComparisonOptions) {
        return this.checkElement(protractor_1.element(protractor_1.by.css('body')), testName, protractorImageComparisonOptions);
    }
    async checkElement(elementFinder, testName, protractorImageComparisonOptions) {
        const saveAboveTolerance = this.pic.saveAboveTolerance;
        const testFileName = dashify(testName);
        const mismatch = await this.pic.checkElement(elementFinder, testFileName, protractorImageComparisonOptions);
        const success = mismatch <= saveAboveTolerance;
        const paths = this.pic._determineImageComparisonPaths(testFileName);
        if (success) {
            paths.imageDiffPath = undefined;
        }
        this.reporter.report({
            baselineImage: paths.baselineImage,
            actualImage: paths.actualImage,
            diffImage: paths.imageDiffPath,
            success,
            date: new Date(),
            testName,
            testFileName
        });
        if (!success) {
            fail('Test ' + testName + ' failed. The mismatch was ' + mismatch + ' percent');
        }
        return mismatch;
    }
}
exports.ImageComparison = ImageComparison;
//# sourceMappingURL=image-comparison.js.map