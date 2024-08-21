import Quill from "quill";
import {useEffect, useRef} from "react";
import "./WYSIWYGEditor.css";

export function WYSIWYGEditor() {
    const quillRef = useRef<Quill | null>(null); // useRef 은 React 컴포넌트에서 mutable한 변수를 저장할 때 사용합니다. mutable이란 변수의 값이 변할 수 있다는 뜻입니다.

    useEffect(() => {
        const container = document.getElementById("editor") as HTMLElement;
        const toolbarOptions = {
            container:[
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                ['link', 'image', 'video'],
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                ['clean'],                                    // remove formatting button
                [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'align': [] }],
                ['undo', 'redo']

            ],
            handler:{
                'undo': function() {
                    quillRef.current?.history.undo();
                },
                'redo': function() {
                    quillRef.current?.history.redo();
                }
            }
        }
        if (container && !quillRef.current) { // quillRef.current가 null이면 새로운 Quill 인스턴스를 생성합니다. 이미 있으면 아무것도 하지 않습니다.
            quillRef.current = new Quill(container, {
                modules: {
                    history: {
                        delay: 1000,
                        maxStack: 100,
                        userOnly: false
                    },
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });
        }
    }, []);

    return <div id="editor" style={{ height: '400px' }}/>; // Ensure the editor has a height
}
