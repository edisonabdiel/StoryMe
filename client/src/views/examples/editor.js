
import React, { useState, useRef } from 'react';
import JoditEditor from "jodit-react";
import '../../assets/css/App.css';
import axios from 'axios'



const Editor = (props) => {
    console.log(props);
    const editor = useRef(null)
    const [content, setContent] = useState("")
    console.log("outPut: Editor -> content", content)
    // props.updateContent(content)

    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        askBeforePasteFromWord: false,
        buttons: "|,bold,strikethrough,underline,italic,eraser,|,superscript,subscript,|,ul,ol,|,outdent,indent,|,font,fontsize,brush,paragraph,|,image,table,link,|,align,undo,redo,|,selectall,cut,copy,paste,copyformat,|,symbol,fullsize,print",

        removeButtons: ['hr', 'source', 'image', 'video', 'about', 'file'],
        toolbarAdaptive: true,


        // uploader: {
        //     "url": "http://localhost:3000/api/upload-img",
        //     "insertImageAsBase64URI": true,
        //     //     "imagesExtensions": [
        //     //         "jpg",
        //     //         "png",
        //     //         "jpeg",
        //     //         "gif"
        //     //     ],
        //     //     "headers": null,
        //     //     "data": null,
        //     //     "filesVariableName": "function(e){return\"files[\"+e+\"]\"}",
        //     //     "withCredentials": false,
        //     //     "pathVariableName": "path",
        //     //     "format": "json",
        //     //     "method": " POST",
        //     //     "prepareData": "function (e) { return new FormData(e) }",
        //     //     "isSuccess": "function(e){return e.success}",
        //     //     "getMessage": "function(e){return void 0!==e.data.messages&&s.isArray(e.data.messages)?e.data.messages.join(\" \"):\"\"}",
        //     //     "process": function (resp) {
        //     //         return {
        //     //             files: resp[this.options.uploader.filesVariableName] || [],
        //     //             path: resp.path,
        //     //             baseurl: resp.baseurl,
        //     //             error: resp.error,
        //     //             msg: resp.msg
        //     //         };
        //     //     },
        //     //     "error": "function(e){this.j.e.fire(\"errorMessage\",e.message,\"error\",4e3)}",
        //     //     "defaultHandlerSuccess": "function(e){var t=this,o=this.j;s.isJoditObject(o)&&e.files&&e.files.length&&e.files.forEach((function(n,r){var i=e.isImages&&e.isImages[r]?[\"img\",\"src\"]:[\"a\",\"href\"],a=i[0],l=i[1],c=o.createInside.element(a);c.setAttribute(l,e.baseurl+n),\"a\"===a&&(c.textContent=e.baseurl+n),s.isJoditObject(t.j)&&(\"img\"===a?t.j.s.insertImage(c,null,t.j.o.imageDefaultWidth):t.j.s.insertNode(c))}))}",
        //     //     "defaultHandlerError": "function(e){this.j.e.fire(\"errorMessage\",e.message)}",
        //     //     "contentType": "function(e){return(void 0===this.j.ow.FormData||\"string\"==typeof e)&&\"application/x-www-form-urlencoded; charset=UTF-8\"}"
        //     // }
        // }
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



