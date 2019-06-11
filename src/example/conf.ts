import * as path from 'path';

import { browser, Config } from 'protractor';

const basePath = path.join('dist', 'example', 'test-results');
const WIDTH = 1050;
const HEIGHT = 880;
const X_POSITION = 300;
const Y_POSITION = 0;

export const config: Config = {
    directConnect: true,
    specs: ['example.spec.js'],
    onPrepare: async () => {
        await browser.driver
            .manage()
            .window()
            .setSize(WIDTH, HEIGHT);
        await browser.driver
            .manage()
            .window()
            .setPosition(X_POSITION, Y_POSITION);

        // returning the promise makes protractor wait for the config before executing tests
        return (global as any).browser.getProcessedConfig().then(() => {
            // nothing
        });
    },
    params: {
        reportPath: basePath
    },
    plugins: [
        {
            package: 'protractor-image-comparison',
            options: {
                autoSaveBaseline: true,
                baselineFolder: path.join(basePath, 'baseline'),
                screenshotPath: basePath,
                returnAllCompareData: true
            }
        }
    ]
};
