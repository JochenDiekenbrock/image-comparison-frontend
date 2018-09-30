import { browser, Config } from 'protractor';

export const config: Config = {
    directConnect: true,
    specs: ['example.spec.js'],
    onPrepare() {
        const protractorImageComparison = require('protractor-image-comparison');
        browser.protractorImageComparison = new protractorImageComparison({
            autoSaveBaseline: true,
            baselineFolder: 'dist/example/baseline/',
            screenshotPath: 'dist/example/'
        });
    }
};
