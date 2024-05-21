
function leftPad(value : number) {
    if (value >= 10) {
        return value;
    }
    return `0${value}`;
}

export function prettyDate(source : Date, delimiter = '-') {
    try{
        const year = source.getFullYear();
        const month = leftPad(source.getMonth() + 1);
        const day = leftPad(source.getDate());
    
        return [year, month, day].join(delimiter);
    }
    catch(e){
        return "";
    }
   
}

export function prettyDateTime(source : Date, delimiter = '-') {
    try{
        const year = source.getFullYear();
        const month = leftPad(source.getMonth() + 1);
        const day = leftPad(source.getDate());
        const hour = leftPad(source.getHours());
        const mins = leftPad(source.getMinutes());
        const secs = leftPad(source.getSeconds());
    
        const result = [year, month, day].join(delimiter) + " " + [hour, mins, secs].join(":")
        return result;
    }
    catch(e){
        return "";
    }
   
}

export function logOut(){
    window.localStorage.removeItem("iuni");
    window.localStorage.removeItem("iuni_refresh");
    window.location.href = "/";
}

export function stringToDate(source : string){
    const time : number = Date.parse(source);
    const date : Date = new Date(time);
    return date;
}