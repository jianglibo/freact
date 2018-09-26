import { CronBuilderUtil } from "./cron-builder-util";

it ('should handle replace.', () => {
    const s = '*/5';
    const ss = s.replace('*/', '0/');
    console.log(ss);
    expect(ss).toBe('0/5');
})

it ('should handle new field states.', () => {
    let ao:boolean[] = [];
    let bo =  CronBuilderUtil.getNewFieldStates(ao, true, 2);
    expect(bo).toEqual([undefined, undefined, true]);
    expect(ao === bo).toBeFalsy();

    ao = [false, true];
    bo =  CronBuilderUtil.getNewFieldStates(ao, true, 2);
    expect(bo).toEqual([false, true, true]);
    expect(ao === bo).toBeFalsy();

    ao = [false, true, false];
    bo =  CronBuilderUtil.getNewFieldStates(ao, true, 2);
    expect(bo).toEqual([false, true, true]);
    expect(ao === bo).toBeFalsy();
})

it ('should acts like an array.', () => {
    const ao = [1];
    const ab = ao.slice(0);
    expect(ao).toEqual(ab);
    expect(ao === ab).toBeFalsy(); // not same object.

    let ac = ab.fill(2, 0); // replace item at index 0.
    expect(ac.length).toBe(1);
    expect(ac[0]).toBe(2);

    ac = ab.fill(3, 2); // no effective, fill position beyond end boundary.
    expect(ac.length).toBe(1);
    expect(ac[0]).toBe(2);

    const deleted = ac.splice(1, 0, 5, 5, 5);
    expect(deleted.length).toBe(0);
    expect(ac).toEqual([2,5,5,5]);
    expect(ab === ac).toBeTruthy();
    
    // the right way to put a value into an array at any index.
    let a1:number[] = [];
    a1.splice(1, 0, 1); // the index must less than the length of origin array. if greater than the length of array, treat it like the length.
    expect(a1).toEqual([1])

    a1 = [];
    a1.splice(100, 0, 1);
    expect(a1).toEqual([1]);

    a1 = [1];
    a1.splice(100, 0, 1);
    expect(a1).toEqual([1, 1]);


    const a10 = [1];
    const a20 = new Array(20);
    a20.splice(0, 0, ...a10);
    console.log(a20);


})

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
