import * as path from 'path';

import { browser, Config } from 'protractor';

export const config: Config = {
    directConnect: true,
    specs: ['example.spec.js'],
    onPrepare() {
        const protractorImageComparison = require('protractor-image-comparison');
        const basePath = path.join('dist', 'example', 'test-results');
        browser.protractorImageComparison = new protractorImageComparison({
            autoSaveBaseline: true,
            baselineFolder: path.join(basePath, 'baseline'),
            screenshotPath: basePath
        });
    }
};
