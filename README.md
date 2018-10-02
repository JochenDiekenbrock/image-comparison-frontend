# image-comparison-frontend
Frontend of an image comparison solution. Performs image comparisons during end to end tests and writes test results

## Installation
```yarn add image-comparison-frontend```  
or  
```npm install --save image-comparison-frontend```

## Usage

## Configuration

You can specify an ```reportPath``` (relative to the current directory) to define where to put the <testname>.test-result.json
files.

ImageComparison will use the protractor-image-comparison screenshotPath by default.  
ResultReporter will use ```test-results``` in the current directory by default.

### With protracor-image-comparison
Configure [protracor-image-comparison](https://github.com/wswebcreation/protractor-image-comparison/).  
In your test, create an ImageComparison instance ```const imageComparison = new ImageComparison({config...});```  
and call a check function, for example ```await imageComparison.checkPage('startPage');```)                                               

### use custom image comparison together with ResultReporter
Create a ResultReporter with ```const reporter = new ResultReporter({config...})```  
and after running your test, call  ```await this.reporter.report(...);```
with a Result object containing information about the test run.

See ```src/image-comparison.ts``` for inspiration.

### API
#### checkElement

```
checkElement(
    elementFinder: ElementFinder,
    testName: string,
    protractorImageComparisonOptions?: any
): Promise<void>
```

creates an image from the specified element and - if the base image already exists) comares it to the base image.

elementFinder: is any valid Protractor element finder, for example ```element(by.id('myElement'))```  
testName: a unique name for your test, for example 'anElement after adding'  
protractorImageComparisonOptions: optionally, you can add additional configuration that is passed through to protractor-image-comparison

returns a Promise resolving to void

#### checkPage

```
checkPage(
    testName: string, 
    protractorImageComparisonOptions?: any
): Promise<void> 
```

Convenience function to create an image with ```checkElement``` specifying the page ```<body>``` as element.

testName: a unique name for your test, for example 'anElement after adding'

returns a Promise resolving to void

## Notes
protractor-image-comparison is set to version 1.7.2 until
[Error: libpng12.so.0: cannot open shared object file: No such file or directory](https://github.com/wswebcreation/protractor-image-comparison/issues/68)
is resolved.


