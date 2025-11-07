// Import interfaces and types

import { ILogMessageFormatter, IMetadata, ILogger, ILogMessage, ILogWriter } from "./interfaces/interfaces.ts"
import { LogLevel } from "./types/types.ts";

// Import implementations

import { StdoutLogWriter } from "./writers/writers.ts";
import { JSONFormatter } from "./formatters/formatters.ts";

/* Implementations */

class Logger<F, W> implements ILogger {

	constructor(private writer: ILogWriter<W>, private formatter: ILogMessageFormatter<F>) {

	};

	private generateLogMessage(type: LogLevel, message: string, metadata?: IMetadata): ILogMessage {
		let logMessage: ILogMessage = {
			type,
			message,
			timestamp: new Date(Date.now()).toISOString()
		};

		if (metadata) {
			logMessage.metadata = metadata;
		};

		return logMessage;
	}

	debug(message: string, metadata?: IMetadata) {
		let logMessage: ILogMessage = this.generateLogMessage("debug", message, metadata)
		// Now you're supposed to pass it to the FORMATTER, which will output as a certain type (generic), 
		this.writer.write(logMessage);
	};

	warn(message: string, metadata?: IMetadata) {
		let logMessage: ILogMessage = this.generateLogMessage("warn", message, metadata)
		this.writer.write(logMessage);
	};

	info(message: string, metadata?: IMetadata) {
		let logMessage: ILogMessage = this.generateLogMessage("info", message, metadata)
		this.writer.write(logMessage);
	};

	error(message: string, metadata?: IMetadata) {
		let logMessage: ILogMessage = this.generateLogMessage("error", message, metadata)
		this.writer.write(logMessage);
	};
};

// export a factory function that invokes a new logger with a user-specified type of writer. 

