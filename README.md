# Simple-Logger
A simple custom logger written in Typescript

## Formatting & Writing Customization
This library is designed from the perspective of formatting and writing customization. The end user of this library has the option to choose the formatting of the log output (via the <LogMessageFormatType> generic in the 'logger.ts' file). The magic happens here:

```
export function createLogger<T>(writer: ILogWriter<T>, formatter: ILogMessageFormatter<T>): Logger<T> {
	return new Logger(writer, formatter);
};
```

### Exported createLogger<T> logger factory function.
When the end user invokes the createLogger function, they do so by passing in an instance of a writer and an instance of a formatter. *These formatters bust be of the same sub-type (the type each writer and formatter implementation utilize*. 

Suppose the end user passes in a JSON Formatter and a StdoutLogWriter. 

**Since the ILogWriter interface describes that the 'write' method will take a logMessage in, of type: 'LogMessageFormatType', and the StdoutLogWriter implements this interface with the <string> type, then the StdoutLogWriter will take a string as its input:**

```
export interface ILogWriter<LogMessageFormatType> {
	write(logMessage: LogMessageFormatType): void;
};
```

**Similarly, if the user chooses to pass a JSONFormatter instance as the second argument to the createLogger<T> factory function, which implements ILogMessageFormatter with a <string> type, then the implemented format function will return data of type 'string':**

```
export class JSONFormatter implements ILogMessageFormatter<string> {
	constructor() {
	};
	format(logMessage: ILogMessage): string {
		return JSON.stringify(logMessage);
	};
};
```

### Logger type
Therefore, when invoking the factory function for a logger below, the type of <T> gets inferred as 'string', and a Logger<string> instance can be initialized:

```
export function createLogger<T>(writer: ILogWriter<T>, formatter: ILogMessageFormatter<T>): Logger<T> {
	return new Logger(writer, formatter);
};
```

At this point, the end user will have a fully functioning instance of a logger that formats the internal log message as a JSON string, and writes the stringified JSON to stdout.


## The Logger Object

Once a logger object is initialized, the user simply must call one of its methods in the code in order to produce a log output:

```
debug(message: string, metadata?: IMetadata) {
		let logMessage: ILogMessage = this.generateLogMessage("debug", message, metadata)
		let formattedLogMessage: LogMessageFormatType = this.formatter.format(logMessage);
		this.writer.write(formattedLogMessage);
	};

	warn(message: string, metadata?: IMetadata) {
		let logMessage: ILogMessage = this.generateLogMessage("warn", message, metadata)
	};

	info(message: string, metadata?: IMetadata) {
		let logMessage: ILogMessage = this.generateLogMessage("info", message, metadata)
	};

	error(message: string, metadata?: IMetadata) {
		let logMessage: ILogMessage = this.generateLogMessage("error", message, metadata)
	};
```

Calling any of the logger methods above will create an internal log message object, format it, and then write it - all based on the user's selected format and writing configuration.
