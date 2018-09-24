import CronFieldDescription from "./cron-field-description";
import PredefinedPattern from "./predefined-pattern";

export default class CronBuilderPros {
  constructor(public fieldDescriptions: CronFieldDescription[], public preDefinedPatterns: PredefinedPattern[]) {
  }
}
