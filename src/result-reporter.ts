import * as fs from 'fs';
import * as path from 'path';

import { Config } from './config';
import { TEST_RESULT_EXTENSION, TestResult } from './test-result';

export class ResultReporter {
    private config: Partial<Config> = {};

    constructor(config: Partial<Config>) {
        this.config = config;
        this.config.reportPath = this.config.reportPath || 'test-results';
        try {
            fs.mkdirSync(this.config.reportPath);
        } catch (ignored) {
            // directory exists, ignore
        }
    }

    public async report(result: TestResult): Promise<void> {
        const testResultFile = path.normalize(
            path.join(this.config.reportPath, `${result.testFileName}${TEST_RESULT_EXTENSION}`)
        );
        result = {
            ...result,
            actualImage: this.toTestResultRelativeFile(testResultFile, result.actualImage),
            baselineImage: this.toTestResultRelativeFile(testResultFile, result.baselineImage),
            diffImage: this.toTestResultRelativeFile(testResultFile, result.diffImage)
        };
        await fs.promises.writeFile(testResultFile, JSON.stringify(result, undefined, 4), 'utf8');
    }

    private toTestResultRelativeFile(testResultFileName: string, fileName: string): string {
        if (!fileName) {
            return undefined;
        }

        /*
            path.relative returns ../actual/start-page-chrome-1050x880-dpr-1.png instead of
            ./actual/start-page-chrome-1050x880-dpr-1.png
        */
        return path.relative(testResultFileName, path.normalize(fileName)).substring(1);
    }
}
