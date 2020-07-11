
import React, { useState, useRef } from 'react';
import JoditEditor from "jodit-react";
import '../../assets/css/App.css';


const Editor = (props) => {
    console.log(props);
    const editor = useRef(null)
    const [content, setContent] = useState("")
    console.log("outPut: Editor -> content", content)
    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        askBeforePasteFromWord: false,
        buttons: "|,bold,strikethrough,underline,italic,eraser,|,superscript,subscript,|,ul,ol,|,outdent,indent,|,font,fontsize,brush,paragraph,|,image,table,link,|,align,undo,redo,|,selectall,cut,copy,paste,copyformat,|,symbol,fullsize,print",
        removeButtons: ['hr', 'source', 'image', 'video', 'about', 'file'],
        toolbarAdaptive: true,

    }



    return (

        <JoditEditor
            ref={editor}
            value={props.content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => [props.updateContent(newContent), setContent(newContent)]} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => { }}
        />

    );
}

export default Editor



