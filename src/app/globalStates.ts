import { atom, selector } from 'recoil';
interface TaskInfo {
    [key:number] : []
}

interface IuniStyle {
    [key:string] : string 
}

export const emailState = atom({
    key : "emailState",
    default : "",
});

export const pwState = atom({
    key : "pwState",
    default : ""
});

export const nickNameState = atom({
    key : "nickNameState",
    default : ""
});

export const nameState = atom({
    key : "nameState",
    default : ""
});

export const boardState = atom<Board[]>({
    key : "boardState",
    default : []
});

export const cardState = atom<TaskInfo>({
    key : "cardState",
    default : {}
})

export const iuniStyleState = atom<IuniStyle>({
    key : "iuniStyleState",
    default : {}
})

export const trashListState = atom<TrashBasket[]>({
    key : "trashListState",
    default : []
});

export const trashState = atom({
    key : "trashState",
    default : {}
})