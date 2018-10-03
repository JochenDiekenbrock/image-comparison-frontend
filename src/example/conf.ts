import * as path from 'path';

import { browser, Config } from 'protractor';

export const config: Config = {
    directConnect: true,
    specs: ['example.spec.js'],
    onPrepare() {
        const protractorImageComparison = require('protractor-image-comparison');
        const basePath = path.join('dist', 'example', 'test-results');
        // const basePath = path.join('..', 'image-comparison-backend', 'public', 'data', 'from-frontend', 'feature 1');
        browser.protractorImageComparison = new protractorImageComparison({
            autoSaveBaseline: true,
            baselineFolder: path.join(basePath, 'baseline'),
            screenshotPath: basePath
        });
    }
};
