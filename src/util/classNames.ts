function mergeClassNames(...arr: any[]): string {
    return arr.filter(s => s).join(" ");
}

export {
    mergeClassNames
};