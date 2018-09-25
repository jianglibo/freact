import { CronBuilderUtil } from "./cron-builder-util";


it('should parse cron range.', () => {
    let v = CronBuilderUtil.parseCronRange('1-', 0)
    expect(v.valid).toBeFalsy();
    v = CronBuilderUtil.parseCronRange('1-2', 0)
    expect(v.valid).toBeTruthy();
    expect(v.start).toEqual(1);
    expect(v.end).toEqual(2);
    expect(v.allValues).toHaveLength(2);

    v = CronBuilderUtil.parseCronRange('56-3', 0)
    expect(v.allValues).toHaveLength(8);

    v = CronBuilderUtil.parseCronRange('60-3', 0)
    expect(v.valid).toBeFalsy();
});

it('should parse cron step.', () => {
    let v = CronBuilderUtil.parseCronStep('1/', 0)
    expect(v.valid).toBeFalsy();

    v = CronBuilderUtil.parseCronStep('1/2', 0)
    expect(v.valid).toBeTruthy();
    expect(v.start).toEqual(1);
    expect(v.step).toEqual(2);

    expect(v.allValues).toHaveLength(30);

    v = CronBuilderUtil.parseCronStep('56/3', 0)
    expect(v.start).toEqual(56);
    expect(v.step).toEqual(3);
    expect(v.allValues).toHaveLength(2);

    v = CronBuilderUtil.parseCronStep('60/3', 0)
    expect(v.valid).toBeFalsy();
});
