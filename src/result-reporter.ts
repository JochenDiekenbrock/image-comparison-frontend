import * as fs from 'fs';
import * as path from 'path';

import { Config } from './config';
import { Result } from './result';

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

    public async report(result: Result): Promise<void> {
        await fs.promises.writeFile(
            path.join(this.config.reportPath, `${result.testFileName}.test-result.json`),
            JSON.stringify(result, undefined, 4),
            'utf8'
        );
    }
}
