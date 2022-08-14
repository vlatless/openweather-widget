import { Units } from './../store/types.d';
export module formatter {
    export function formatUnixTime(time: number) {
        return new Date(time * 1000).toLocaleTimeString().slice(0,-3);
    };

    export function formatTemperature(t: number, unit: Units) {
        t = Math.round(t);
        let formattedT = t > 0 ? '+' + t : t;
        
        return formattedT + formatUnit(unit);
    };

    export function formatUnit(unit: Units) {
        let formattedUnit;
        switch (unit) {
            case Units.imperial:
                formattedUnit = 'F';
            break;
            case Units.metric:
                formattedUnit = 'C';
            break;
            case Units.kelvin:
                formattedUnit = 'K';
            break;
        };

        return formattedUnit;
    }
}