export interface TestResult {
    success: boolean;
    date: Date;
    testName: string;
    testFileName: string;
    actualImage: string;
    baselineImage: string;
    diffImage?: string;
}
export declare const TEST_RESULT_EXTENSION = '.test-result.json';
