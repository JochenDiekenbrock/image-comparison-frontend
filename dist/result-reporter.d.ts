import { Config } from './config';
import { TestResult } from './test-result';
export declare class ResultReporter {
    private config;
    constructor(config: Partial<Config>);
    report(result: TestResult): Promise<void>;
    private toTestResultRelativeFile;
}
