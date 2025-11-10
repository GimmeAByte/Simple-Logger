import { LogLevel } from "../types/types.js";

// Interface definitions

// Use a generic for formatter types so that you can pass in the return type of the formatter's .format() method in the implementation.
export interface ILogMessageFormatter<LogMessageFormatType> {
	format(logMessage: ILogMessage): LogMessageFormatType;
};

export interface IMetadata {
	[key: string]: unknown;
};

export interface ILogger {
	debug(message: string, metadata?: IMetadata): void;
	warn(message: string, metadata?: IMetadata): void;
	info(message: string, metadata?: IMetadata): void;
	error(message: string, metadata?: IMetadata): void
};

export interface ILogMessage {
	type: LogLevel;
	message: string;
	metadata?: IMetadata;
	timestamp: string;
};

export interface ILogWriter<LogMessageFormatType> {
	write(logMessage: LogMessageFormatType): void;
};
