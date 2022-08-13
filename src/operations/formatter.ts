export module formatter {
    export function formatUnixTime(time: number) {
        return new Date(time * 1000).toLocaleTimeString().slice(0,-3);
    };

    export function formatTemperature(t: number) {
        t = Math.round(t);
        return t > 0 ? '+' + t : t
    }
}