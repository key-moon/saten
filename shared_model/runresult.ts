export default class RunResult {
    constructor(initializers: { elapsedTime: number; output: string; trace: string }) {
        this.elapsedTime = initializers.elapsedTime;
        this.output = initializers.output;
        this.trace = initializers.trace;
    }
    elapsedTime: number;
    output: string;
    trace: string;
}
