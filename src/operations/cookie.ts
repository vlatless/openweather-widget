export module cookie {
    export function setCookie(key: string, value: string) {
        document.cookie = key + "=" + value;
    }
    
    export function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts: Array<string> = value.split(`; ${name}=`);
        
        if (parts.length === 2) 
            return parts.pop()?.split(';').shift();
    }
}