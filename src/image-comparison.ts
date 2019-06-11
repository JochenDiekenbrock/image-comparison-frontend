import * as dashify from 'dashify';
import { browser, ElementFinder } from 'protractor';
import ProtractorImageComparison from 'protractor-image-comparison/build/protractor.image.compare';

import { Config } from './config';
import { ResultReporter } from './result-reporter';

export class ImageComparison {
    private readonly config: Partial<Config>;
    private pic: ProtractorImageComparison = browser.imageComparison;
    private reporter: ResultReporter;

    constructor(config?: Partial<Config>) {
        config = config || {};
        this.config = { reportPath: config.reportPath || this.pic.folders.baselineFolder };
        this.reporter = new ResultReporter(this.config);
    }

    public checkPage(testName: string, protractorImageComparisonOptions?: any): Promise<number> {
        return this.check(testName, true, protractorImageComparisonOptions);
    }

    public async checkElement(
        elementFinder: ElementFinder,
        testName: string,
        protractorImageComparisonOptions = {}
    ): Promise<number> {
        return this.check(testName, false, protractorImageComparisonOptions, elementFinder);
    }

    private async check(
        testName: string,
        isFullscreen: boolean,
        protractorImageComparisonOptions = {},
        elementFinder?: ElementFinder
    ): Promise<number> {
        const saveAboveTolerance: number = this.pic.defaultOptions.compareOptions.saveAboveTolerance;
        const testFileName = dashify(testName);
        let compareResult: /* ImageCompareResult */ {
            fileName: string;
            folders: {
                actual: string;
                baseline: string;
                diff?: string;
            };
            misMatchPercentage: number;
        };
        if (isFullscreen) {
            compareResult = (await this.pic.checkFullPageScreen(testFileName, protractorImageComparisonOptions)) as any;
        } else {
            compareResult = (await this.pic.checkElement(
                elementFinder,
                testFileName,
                protractorImageComparisonOptions
            )) as any;
        }
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
