import AjaxDataResult from './ajax-data-result';
import AjaxErrorResult from './ajax-error-result';

export function isAjaxDataResult(pet: AjaxDataResult | AjaxErrorResult): pet is AjaxDataResult {
    return (pet as AjaxDataResult).data !== undefined;
}