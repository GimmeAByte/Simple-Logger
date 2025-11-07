import { LogLevel } from "../types/types.ts";

// Interface definitions

// Use a generic for formatter types so that you can pass in the return type of the formatter's .format() method in the implementation.
export interface ILogMessageFormatter<F> {
	format(logMessage: ILogMessage): F;
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

export interface ILogWriter<W> {
	write(logMessage: W): void;
};
