const coef = 0.75;

export function convertFromMBarToMmHg(value: number) {
    return value * coef;
}