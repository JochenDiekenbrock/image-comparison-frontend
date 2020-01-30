import { ElementFinder } from 'protractor';
import { Config } from './config';
export declare class ImageComparison {
    private readonly config;
    private pic;
    private reporter;
    private check;
    constructor(config?: Partial<Config>);
    public checkPage(testName: string, protractorImageComparisonOptions?: any): Promise<number>;
    public checkElement(
        elementFinder: ElementFinder,
        testName: string,
        protractorImageComparisonOptions?: {}
    ): Promise<number>;
}
