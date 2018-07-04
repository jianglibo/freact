it('is a data type.', () => {
    interface IstringIndexed {
        [key: string]: string
    };
    const v: IstringIndexed = {"a": "1"};
    expect(v.a).toBe("1");
});