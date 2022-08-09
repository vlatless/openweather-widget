import config  from "../../app.config.json";
import { RequestParams } from '@/store/types';

export module api {
    export async function fetchData(request: RequestParams) {
        const response = await fetch(
            `${config.publicUrl}?`
            +`&appid=${config.publickKey}`
            +`&units=${request.unit}`
            +`&lat=${request.lat}`
            +`&lon=${request.lon}`
            +`&q=${request.city ?? ''}`
        );
        
        return response;
    };
};
