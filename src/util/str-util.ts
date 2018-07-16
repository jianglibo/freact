
const nargs = /\{([0-9a-zA-Z_]+)\}/g;
/**
 * Copy unmodified from https://github.com/Matt-Esch/string-template/blob/master/index.js.
 * @param str 
 */
// tslint:disable-next-line:variable-name
function template(str: string, ..._others: any[]): string {
    let args: any;

    if (arguments.length === 2 && typeof arguments[1] === "object") {
        args = arguments[1]
    } else {
        args = new Array(arguments.length - 1)
        for (let i = 1; i < arguments.length; ++i) {
            args[i - 1] = arguments[i]
        }
    }

    if (!args || !args.hasOwnProperty) {
        args = {}
    }

    return str.replace(nargs, function replaceArg(match, i, index) {
        let result

        if (str[index - 1] === "{" &&
            str[index + match.length] === "}") {
            return i
        } else {
            result = args.hasOwnProperty(i) ? args[i] : null
            if (result === null || result === undefined) {
                return ""
            }

            return result
        }
    })
}
/**
 * Copy from https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters.
 * @param query 
 */
function parseQueryStringInternal(query: string): { [key: string]: string | string[] } {
    if (query.trim().length === 0) {
        return {};
    }
    const vars = query.split("&")
    const queryString = {};

    for (const v of vars) {
        const pair = v.split("=");
        const key = decodeURIComponent(pair[0]);
        const value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof queryString[key] === "undefined") {
            queryString[key] = decodeURIComponent(value);
            // If second entry with this name
        } else if (typeof queryString[key] === "string") {
            const arr = [queryString[key], decodeURIComponent(value)];
            queryString[key] = arr;
            // If third or later entry with this name
        } else {
            queryString[key].push(decodeURIComponent(value));
        }
    }
    return queryString;
}

export let StrUtil = {
    chopDashPrefix: (origin: string | number): string => {
        if (typeof origin === 'number') {
            return origin + "";
        }
        return origin.replace(/^.*?-/, "");
    },
    format: template,
    keepTrailingNumber: (origin: string | number): string => {
        if (typeof origin === 'number') {
            return origin + "";
        }
        return origin.replace(/^\D+/g, '');
    },
    parseQueryString: parseQueryStringInternal
};
