interface Board {
    id: number,
    name: string,
    description: string,
    projectId: number | null,
    boardOrder : number,
}

interface Task{
    id : number;
    name : string;
    description : string;
    startDate : Date;
    endDate : Date;
    dueDate : Date;
    creator : number | null;
    point : number;
    statusId : number;
    mapId : number;
    createDate : Date;
    status : Status;
    taskOrder : number;
    majorVersion: number;
    minorVersion: number;
    editor : number | null;
    statusName : string;
    taskMemberMapList : any;
    isShared : boolean;
}

interface Status{
    id : number,
    name : string,
    description : string,
    type : string,
}

interface TaskMember{
    memberId : number,
    name : string,
    nickName: string,
    taskId: number,
    type: string
}
interface Avatar{
    background: string;
    body: string;
    hair : string;
    leftEar: string;
    leftFace : string;
    leftWhiteEye : string;
    leftEye: string;
    nose : string;
    rightEar : string;
    rightFace : string;
    rightWhiteEye : string;
    rightEye : string;
    type : string;
}

interface SignIn{
    id : number;
    email : string;
    nickName : string;
    name : string;
    certification : boolean;
    avatar : Avatar;
}

interface TaskMemberMap{
    id : number;
    memberId : number;
    mapType : string;
    taskId : number;
}
interface BasicMember{
    id: number;
    email : string;
    nickName: string;

}
interface AlarmContents{
    alarms : Alarm[];
    shareTaskAlarms : Alarm[];
}
interface Alarm{
    id : number;    
    name : string;
    alarmType : string;
    status : string;
    relateId :number;
    createDate : Date;
    isRead : boolean;
    toMember : BasicMember;
    fromMember : BasicMember;
}
interface TrashBasket{
    id:number;
    name:string;
    createDate:Date;
    type:number;
    trashId:number;
}