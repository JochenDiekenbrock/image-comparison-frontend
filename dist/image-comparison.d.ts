import { ElementFinder } from 'protractor';
import { Config } from './config';
export declare class ImageComparison {
    private readonly config;
    private pic;
    private reporter;
    constructor(config?: Partial<Config>);
    checkPage(testName: string, protractorImageComparisonOptions?: any): Promise<number>;
    checkElement(
        elementFinder: ElementFinder,
        testName: string,
        protractorImageComparisonOptions?: {}
    ): Promise<number>;
    private check;
}
