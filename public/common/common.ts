
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

export function logOut(){
    console.log("엄엄엄ㅇ머");
    window.localStorage.removeItem("iuni");
    window.localStorage.removeItem("iuni_refresh");
    window.location.href = "/";
}