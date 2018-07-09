it('is a data type.', () => {
    interface IstringIndexed {
        [key: string]: string
    };
    const v: IstringIndexed = {"a": "1"};
    expect(v.a).toBe("1");
});

it('can handle string interpolation', () => {
    const o: any = {};
    const oo: any = {a: 1};
    o.oo = oo;

    const s = `a${o.oo.a}b`;
    expect(s).toEqual("a1b");
});

it('should recognize type of object.', () => {
    expect(typeof "abc").toEqual("string");
    expect(typeof {}).toEqual("object");
});