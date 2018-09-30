import { Config } from './config';
import { browser, by, element, ElementFinder } from 'protractor';
import { ResultReporter } from './result-reporter';
import { ProtractorImageComparisonPaths } from './protractor-image-comparison-paths';

export class ImageComparison {
    constructor(config?: Partial<Config>) {
        config = config || {};
        this._config = { reportPath: config.reportPath || this._pic.baseFolder };
        // console.log('config', this._config);
        this._reporter = new ResultReporter(this._config);
    }

    private _config: Partial<Config>;
    private _pic = browser.protractorImageComparison;
    private _reporter: ResultReporter;

    public checkScreen(testName: string, protractorImageComparisonOptions?: any): Promise<void> {
        return this.checkElement(element(by.css('body')), testName, protractorImageComparisonOptions);
    }

    async checkElement(
        elementFinder: ElementFinder,
        testName: string,
        protractorImageComparisonOptions?: any
    ): Promise<void> {
        const saveAboveTolerance: number = this._pic.saveAboveTolerance;
        const mismatch: number = await this._pic.checkElement(
            elementFinder,
            testName,
            protractorImageComparisonOptions
        );
        const success = mismatch >= saveAboveTolerance;
        const paths: ProtractorImageComparisonPaths = this._pic._determineImageComparisonPaths(testName);
        if (success) {
            paths.imageDiffPath = undefined;
        }
        this._reporter.report({
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
