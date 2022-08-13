export module formatter {
    export function formatUnixTime(time: number) {
        return new Date(time * 1000).toLocaleTimeString().slice(0,-3);
    };

    export function formatTemperature(t: number) {
        return t > 0 ? '+' + t : t
    }
}