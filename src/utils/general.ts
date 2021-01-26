export function parseHtmlEntities(str: string) {
    return str.replace(/&#(\d{1,3});/gi, function (match: string, numStr: string) {
        return String.fromCharCode(parseInt(numStr, 10));
    });
};

export function filterByCode(arr: any[], obj: any): any[] {
    return arr.filter((item: any) => (
        (item.codprov === obj.codprov && item.codigoine !== obj.codigoine) ||
        (item.codprov !== obj.codprov && item.codigoine !== obj.codigoine)
    ))
};