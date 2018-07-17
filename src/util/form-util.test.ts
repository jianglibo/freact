import { formUtil } from './form-util';


it('should create number parameter', () => {
    const v = formUtil.createForm({action: '/'}, {id: 55});
    const html = v.html();
    expect(v.attr('method')).toEqual('POST');
    expect(html).toMatch('type="hidden"');
    expect(html).toMatch('value="55"');
    expect(html).toMatch('name="_method"');
    expect(html).toMatch('value="POST"');
});


it('should create list number parameter', () => {
    let v = formUtil.createForm({action: '/', method: 'PUT'}, {id: [55, 66, 77]});
    let html = v.html();
    expect(v.attr('method')).toEqual('POST');
    expect(html).toMatch('type="hidden"');
    expect(html).toMatch('value="55,66,77"');
    expect(html).toMatch('name="_method"');
    expect(html).toMatch('value="PUT"');

    v = formUtil.createForm({action: '/', method: 'DELETE'}, {id: [55, 66, 77]}, '|');
    html = v.html();
    expect(v.attr('method')).toEqual('POST');
    expect(html).toMatch('type="hidden"');
    expect(html).toMatch('value="55|66|77"');
    expect(html).toMatch('name="_method"');
    expect(html).toMatch('value="DELETE"');
});
