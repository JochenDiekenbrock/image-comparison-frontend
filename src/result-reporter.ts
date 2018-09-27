import { Config } from './config';
import { Result } from './result';

export class ResultReporter {
    constructor(config: Partial<Config>) {}

    public report(result: Result): void {
        console.log('report:', { result });
    }
}
