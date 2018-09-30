import * as fs from 'fs';
import * as path from 'path';

import { Config } from './config';
import { Result } from './result';

export class ResultReporter {
    constructor(config: Partial<Config>) {
        this._config = config;
        this._config.reportPath = this._config.reportPath || 'test-results';
        try {
            fs.mkdirSync(this._config.reportPath);
        } catch (ignored) {}
    }

    private _config: Partial<Config> = {};

    async report(result: Result): Promise<void> {
        await fs.promises.writeFile(
            path.join(this._config.reportPath, `${result.testName}.json`),
            JSON.stringify(result, undefined, 4),
            'utf8'
        );
    }
}
