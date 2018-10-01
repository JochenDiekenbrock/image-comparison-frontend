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

    public checkScreen(testName: string, protractorImageComparisonOptions?: any): Promise<void> {
        return this.checkElement(element(by.css('body')), testName, protractorImageComparisonOptions);
    }

    public async checkElement(
        elementFinder: ElementFinder,
        testName: string,
        protractorImageComparisonOptions?: any
    ): Promise<void> {
        const saveAboveTolerance: number = this.pic.saveAboveTolerance;
        const mismatch: number = await this.pic.checkElement(elementFinder, testName, protractorImageComparisonOptions);
        const success = mismatch <= saveAboveTolerance;
        const paths: ProtractorImageComparisonPaths = this.pic._determineImageComparisonPaths(testName);
        if (success) {
            paths.imageDiffPath = undefined;
        }
        await this.reporter.report({
            ...paths,
            success,
            date: new Date(),
            testName
        });

        if (!success) {
            fail('Test ' + testName + ' failed. The mismatch was ' + mismatch + ' percent');
        }
    }
}
