import { ILogWriter, ILogMessage } from "../interfaces/interfaces.js";

// Log writers

export class StdoutLogWriter implements ILogWriter<string> {
	// Leave constructor available for future options on the writer
	constructor() {

	};
	write(logMessage: string) {
		console.log(logMessage);
	};
};
