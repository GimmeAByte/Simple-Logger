import { ILogMessageFormatter } from "../interfaces/interfaces.js";
import { ILogMessage } from "../interfaces/interfaces.js";
// Formatter definitions

export class JSONFormatter implements ILogMessageFormatter<string> {
	constructor() {
	};
	format(logMessage: ILogMessage): string {
		return JSON.stringify(logMessage);
	};
}

