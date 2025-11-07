// Import interfaces and types

import { ILogMessageFormatter, IMetadata, ILogger, ILogMessage, ILogWriter } from "./interfaces/interfaces.ts"
import { LogLevel } from "./types/types.ts";

// Import implementations

import { StdoutLogWriter } from "./writers/writers.ts";
import { JSONFormatter } from "./formatters/formatters.ts";

/* Implementations */

class Logger<LogMessageFormatType> implements ILogger {

	constructor(private writer: ILogWriter<LogMessageFormatType>, private formatter: ILogMessageFormatter<LogMessageFormatType>) {

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
};

// Export a factory function that invokes a new logger with a user-specified type of writer. 

export function createLogger<T>(writer: ILogWriter<T>, formatter: ILogMessageFormatter<T>): Logger<T> {
	return new Logger(writer, formatter);
};
