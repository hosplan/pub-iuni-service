"use client"
import { Editor }  from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import fontSize from "tui-editor-plugin-font-size";
import "tui-editor-plugin-font-size/dist/tui-editor-plugin-font-size.css";
import Prism from 'prismjs'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import { useRef, useState } from "react";
interface Props {
    task : Task;
    setTask: React.Dispatch<React.SetStateAction<Task>>;
    update: () => void;
}

export default function EditorBox(props : Props){
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const editorRef = useRef<any>(null);    
    const updateDescription = () => {
        const updateDescription = editorRef.current.getInstance().getHTML();
        
        props.setTask((pre: Task) => {
            pre.description = updateDescription;
            return {...pre};
        });
        setIsUpdate(() => false);
        props.update();
    }
    
    return(
        <>
        {
            !isUpdate ?
            <>
                <div onClick={() => setIsUpdate(true)} dangerouslySetInnerHTML={{ __html : props.task.description }}>
                   
                </div>
            </> :
            <>
                <div className="btn-list">
                    <div onClick={() => setIsUpdate(false)}>취소</div>
                    <div onClick={() => updateDescription()}>저장</div>
                </div>                
                <Editor
                    ref={editorRef}
                    initialValue={props.task.description}
                    previewStyle="vertical"
                    viewer={true}
                    height="100%"
                    initialEditType="wysiwyg"
                    hideModeSwitch={true}
                    toolbarItems={[ // 툴바 옵션 설정
                        ["heading", "bold", "italic", "strike"],
                        ["hr", "quote"],
                        ["ul", "ol", "task", "indent", "outdent"],
                        ["table", /* "image", */ "link"],
                    ]}
                    plugins={[colorSyntax, fontSize, [codeSyntaxHighlight, { highlighter: Prism }]]}
                />
                <style jsx>
                    {
                        `
                        .btn-list{
                            display:flex;
                            justify-content : flex-end;
                            gap:6px;
                            padding-top: 6px;
                            padding-bottom: 6px;
                        }
                    
                        `
                    }
                </style>
            </>
        }
        </>
    )
}