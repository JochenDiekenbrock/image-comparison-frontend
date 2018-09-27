import { ProtractorImageComparisonPaths } from './protractor-image-comparison-paths';

export interface Result extends ProtractorImageComparisonPaths {
    /* true, if the image comparison mismatch was below browser.protractorImageComparison.saveAboveTolerance */
    success: boolean;

    /* Date when the test was run */
    date: Date;

    testName: string;
}
