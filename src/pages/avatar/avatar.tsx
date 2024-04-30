interface Props{
    avatar : Avatar;
    width : string;
    height: string
}
export default function Avatar(props: Props){
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 48 48">
                <path data-name="background" d="M24 0A24 24 0 1 1 0 24 24 24 0 0 1 24 0" style={{ fill: props.avatar?.background }} />
                <path data-name="body" d="M33.945 10.305h-2.42l-3.337 6.936h-8.375l-3.337-6.936h-2.421S5.275 22.35 1.391 32.058a24 24 0 0 0 45.219 0c-3.885-9.708-12.665-21.753-12.665-21.753" style={{ fill: props.avatar?.body }} />
                <path data-name="nose" d="m24 37.624-1.39-1.54h2.78z" style={{ fill: props.avatar?.nose }} />
                <path data-name="left-eye-white" d="M16.119 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: props.avatar?.leftWhiteEye }} />
                <path data-name="left-eye" d="M16.119 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: props.avatar?.leftEye }} />
                <path data-name="right-eye-white" d="M31.882 35.59a5.3 5.3 0 1 1 5.3-5.3 5.3 5.3 0 0 1-5.3 5.3" style={{ fill: props.avatar?.rightWhiteEye }} />
                <path data-name="right-eye" d="M31.882 33.153a2.865 2.865 0 1 1 2.864-2.865 2.865 2.865 0 0 1-2.864 2.865" style={{ fill: props.avatar?.rightEye }} />
            </svg>
        </>
    )
}