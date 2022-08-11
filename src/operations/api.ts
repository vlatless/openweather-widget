import config  from "../../app.config.json";
import { RequestParams } from '../store/types';

export module api {
    export async function fetchData(request: RequestParams) {
        const response = await fetch(
            `${config.publicUrl}?`
            +`&appid=${config.publicKey}`
            +`&units=${request.unit}`
            +`&lat=${request.lat}`
            +`&lon=${request.lon}`
            +`&q=${request.city ?? ''}`
            +`&lang=${request.lang}`
        );
        
        return response;
    };

    export async function fetchLocalTime(lat: number, lon: number) {
        const response = await fetch(
            `${config.localTimeUrl}?`
            +`&latitude=${lat}`
            +`&longitude=${lon}`,
            {
                mode: "cors",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        return response;
    }
};
