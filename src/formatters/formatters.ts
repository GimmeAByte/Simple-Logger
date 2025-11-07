import { ILogMessageFormatter, ILogMessage } from "../interfaces/interfaces.ts";

// Formatter definitions

export class JSONFormatter implements ILogMessageFormatter<string> {
	format(logMessage: ILogMessage): string {
		return JSON.stringify(logMessage);
	};
};
