import { StrUtil } from './str-util';

it('should format object', () => {
    const v = StrUtil.format('{hello} world!', {hello: '123'});
    expect(v).toEqual("123 world!");
});

it('should format array', () => {
    const v = StrUtil.format('{0} world!', '123', '1354');
    expect(v).toEqual("123 world!");
});

it('should format array multiple value.', () => {
    const v = StrUtil.format('{0}{1} world!', '123', '1354');
    expect(v).toEqual("1231354 world!");
});

it('should format empty object.', () => {
    const v = StrUtil.format('{0}{1} world!');
    expect(v).toEqual(" world!");
});

it('should chopDashPrefix.', () => {
    let v = StrUtil.chopDashPrefix("item-0");
    expect(v).toEqual("0");
    v = StrUtil.chopDashPrefix("item");
    expect(v).toEqual("item");

    v = StrUtil.chopDashPrefix("item-");
    expect(v).toEqual("");

    v = StrUtil.chopDashPrefix("item-0-1-2");
    expect(v).toEqual("0-1-2");
});

it('should parse no parameter url.', () => {
    const em = "".substring(1);
    expect(em).toEqual("");
    let v = StrUtil.parseQueryString("?a=b".substring(1));
    expect(v).toEqual({a: 'b'});
    v = StrUtil.parseQueryString("".substring(1));
    expect(v).toEqual({});
});