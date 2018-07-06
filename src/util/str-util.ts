export let StrUtil = {
    keepTrailingNumber: (origin: string): string => {
        return origin.replace( /^\D+/g, '');
    }
};

