export async function load() {       
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_CONTENT_API_HOST}/conts/trashBasket/all`, {
            method: "GET",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("iuni")}`
            },
        });
        return result.json();
    }
    catch (e) {
        return false;
    }
}