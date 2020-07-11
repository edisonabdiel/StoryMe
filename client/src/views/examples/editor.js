
import React, { useState, useRef } from 'react';
import JoditEditor from "jodit-react";
import '../../assets/css/App.css';
<<<<<<< HEAD

=======
>>>>>>> fd73b37d6fdddcc087abc9960123f6db7c1461e0


const Editor = (props) => {
    console.log(props);
    const editor = useRef(null)
    const [content, setContent] = useState("")
    console.log("outPut: Editor -> content", content)
    // config for the add story page
    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        askBeforePasteFromWord: false,
        buttons: "|,bold,strikethrough,underline,italic,eraser,|,superscript,subscript,|,ul,ol,|,outdent,indent,|,font,fontsize,brush,paragraph,|,image,table,link,|,align,undo,redo,|,selectall,cut,copy,paste,copyformat,|,symbol,fullsize,print",
        removeButtons: ['hr', 'source', 'image', 'video', 'about', 'file'],
        toolbarAdaptive: true,
        // askBeforePasteFromWord: false,
        // defaultActionOnPaste: "insert_as_text",
        askBeforePasteHTML: false
    }
    // config for edit profile page
    const config2 = {
        readonly: false,
        askBeforePasteFromWord: false,
        buttons: "|,bold,strikethrough,underline,italic,|,|,ul,ol,|,,fontsize,brush,,|,\n,cut,copy,paste,|",
        removeButtons: ['hr', 'source', 'image', 'video', 'about', 'file', "copyformat", 'table', 'link'],
        toolbarAdaptive: false,
        askBeforePasteHTML: false
    }





    return (

        <JoditEditor
            ref={editor}
            value={props.content}
            config={props.profile ? config2 : config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => [props.updateContent(newContent), setContent(newContent)]} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => { }}
        />

    );
}

export default Editor



