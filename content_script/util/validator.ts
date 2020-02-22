import Status from "../model/status";

export class ValidatorConfig {}

export function validate(
    sampleOutput: string,
    answerOutput: string,
    config: ValidatorConfig = new ValidatorConfig()
): Status {
    console.log(config);
    return Status.AC;
}
