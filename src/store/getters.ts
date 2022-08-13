import { formatter } from "../operations/formatter";
import { GetterTree } from "vuex";
import { FormattedSunTime, FormattedTemperature, WidgetState } from "./types";
import { convertFromMBarToMmHg } from "../operations/pressureConverter";

export const getters: GetterTree<WidgetState, WidgetState> = {
	sunTime(state) {
		return {
            sunset: formatter.formatUnixTime(state.sys.sunset),
            sunrise: formatter.formatUnixTime(state.sys.sunrise),
        } as FormattedSunTime
	},
    temperature(state) {
        return {
            temp: formatter.formatTemperature(state.main.temp),
            feels_like: formatter.formatTemperature(state.main.feels_like),
            temp_min: formatter.formatTemperature(state.main.temp_min),
            temp_max: formatter.formatTemperature(state.main.temp_max)
        } as FormattedTemperature
    },
    pressure(state) {
        return { pressure: Math.round(convertFromMBarToMmHg(state.main.pressure)) }
    }
}
