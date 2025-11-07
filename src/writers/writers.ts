import { ILogWriter, ILogMessage } from "../interfaces/interfaces.ts";

// Log writers

export class StdoutLogWriter implements ILogWriter<string> {
	// Leave constructor available for future optionson the Stdout writer
	constructor() {

	};
	write(logMessage: string) {
		console.log(logMessage);
	};
};
