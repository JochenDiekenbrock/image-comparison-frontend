"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const protractor_1 = require("protractor");
exports.config = {
    directConnect: true,
    specs: ['example.spec.js'],
    onPrepare() {
        const protractorImageComparison = require('protractor-image-comparison');
        const basePath = path.join('dist', 'example', 'test-results');
        // const basePath = path.join('..', 'image-comparison-backend', 'public', 'data', 'from-frontend', 'feature 1');
        protractor_1.browser.protractorImageComparison = new protractorImageComparison({
            autoSaveBaseline: true,
            baselineFolder: path.join(basePath, 'baseline'),
            screenshotPath: basePath
        });
    }
};
//# sourceMappingURL=conf.js.map