import * as dashify from 'dashify';
import { browser, by, element, ElementFinder } from 'protractor';

import { Config } from './config';
import { ProtractorImageComparisonPaths } from './protractor-image-comparison-paths';
import { ResultReporter } from './result-reporter';

export class ImageComparison {
    private readonly config: Partial<Config>;
    private pic = browser.protractorImageComparison;
    private reporter: ResultReporter;

    constructor(config?: Partial<Config>) {
        config = config || {};
        this.config = { reportPath: config.reportPath || this.pic.baseFolder };
        this.reporter = new ResultReporter(this.config);
    }

    public checkPage(testName: string, protractorImageComparisonOptions?: any): Promise<number> {
        return this.checkElement(element(by.css('body')), testName, protractorImageComparisonOptions);
    }

    public async checkElement(
        elementFinder: ElementFinder,
        testName: string,
        protractorImageComparisonOptions?: any
    ): Promise<number> {
        const saveAboveTolerance: number = this.pic.saveAboveTolerance;
        const testFileName = dashify(testName);
        const mismatch: number = await this.pic.checkElement(
            elementFinder,
            testFileName,
            protractorImageComparisonOptions
        );
        const success = mismatch <= saveAboveTolerance;
        const paths: ProtractorImageComparisonPaths = this.pic._determineImageComparisonPaths(testFileName);
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
