'use client';
import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Arrow, Group,Transformer} from 'react-konva';

export default function Canvas_cmp({ isClicked, setClicked }) {    
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    // state for copy and paste shape
    const [clipboard, setClipboard] = useState(null)
    //rectangle states
    const [rectanglesPos, setRectanglesPos] = useState([]);
    const [doubleClicked, setDoubleClicked] = useState(null); // for rect ,circle text area 
    const [height, setHeight] = useState(30);
    const [translate, setTranslate] = useState(0);
    //circle states
    const [circlesPos, setCirclesPos] = useState([]);

    //attach line and arrow with rectangle and cirlce
    const [isAttach,setAttach] = useState([false,null]);
    //Line states
    const [lines, setLines] = useState([]); //state for lines .....
    const [arrows, setArrows] = useState([]); //state for arrows .....
    const [pen, setPen] = useState([]); //state for pen.....
    // const [isDrawing, setIsDrawing] = useState([false,null]);
    const [isDrawing, setIsDrawing] = useState([false,null]);
    const [newLine, setNewLine] = useState([]);
    
    //text states
    const [inputPos, setInputPos] = useState(null);
    const [text_id,setTextId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [inputSize, setInputSize] = useState({width:5,fontsize:16});
    const [texts, setTexts] = useState([]);

    // Eraser 
    const[eraser,setEraser] = useState({x:200,y:200});

    const [selectedShape,setSelectedShape] = useState(null);
    
    const [showAlert,setShowAlert] = useState(false); // for alerts 
    const inputRef = useRef(null); // for text input
    const spanRef = useRef(null); // for input text width 
    const textareaRef = useRef(null);
    const transformerRef = useRef(null); // for resize 
    const textAreaSpanRef = useRef(null); // for resize 
    const stageRef = useRef(null);
    

    useEffect(()=>{
        // console.log("double click",doubleClicked)
        if(textareaRef.current){
            textareaRef.current.value = doubleClicked.text_value;                      
        }        
    },[doubleClicked])

    // useEffect(()=>{
    //     console.log("input pos updated  in useeffect ",inputPos)
        
    // },[inputPos])
    useEffect(()=>{
        console.log("................",rectanglesPos)
        
    },[rectanglesPos])

  useEffect(() => {
    
    // {selectedShape && console.log("selected shape ",selectedShape.y())}
      const handleKeyDown = (e) => {
        
        if(e.ctrlKey && e.key === "c" && selectedShape){            
            setClipboard(selectedShape);            
        }else if(e.ctrlKey && e.key === "b"){
            console.log("save called");
            
            if (rectanglesPos.length !== 0) {
                localStorage.setItem('rectangles',JSON.stringify(rectanglesPos)) //  saving rectangles
            }
            if (circlesPos.length !== 0) {
                localStorage.setItem('circle',JSON.stringify(circlesPos)) // saving circle
            }
            if (lines.length !== 0) {
                localStorage.setItem('line',JSON.stringify(lines)) // saving line
            }
            if (arrows.length !== 0) {
                localStorage.setItem('arrow',JSON.stringify(arrows)) // saving arrow
            }
            if (pen.length !== 0) {
                localStorage.setItem('pen',JSON.stringify(pen)) // saving pen
            }
            if (texts.length !== 0) {
                localStorage.setItem('text',JSON.stringify(texts)) // saving pen
            }

            setTimeout(()=>{
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            },100);
            // setShowAlert(false);
        }       

        // pasting the copied shape 
        if(clipboard && e.ctrlKey && e.key === "v" ){

            if(clipboard.getClassName() === 'Rect'){
                let rect_ele = rectanglesPos.find(rect=> rect.id === clipboard.id());
                const new_temp_id = nanoid();
                let new_attrs = { ...rect_ele.attrs, x: rect_ele.attrs.x + 30, y: rect_ele.attrs.y + 30 };                
                setRectanglesPos([...rectanglesPos,{id: new_temp_id, attrs: new_attrs}])
            }
            else if(clipboard.getClassName() === 'Circle'){
                let circle_ele = circlesPos.find(circle=> circle.id === clipboard.id());
                const new_temp_id = nanoid();
                let new_attrs = { ...circle_ele.attrs, x: circle_ele.attrs.x + 30, y: circle_ele.attrs.y + 30 };              
                setCirclesPos([...circlesPos,{id: new_temp_id, attrs: new_attrs}]);
            }
            else if(clipboard.getClassName() === 'Text'){
                let text_ele = texts.find(text=> text.id === clipboard.id());
                const new_temp_id = nanoid();
                let new_attrs = { ...text_ele.attrs, x: text_ele.attrs.x + 30, y: text_ele.attrs.y + 30 };
                setTexts([...texts,{id: new_temp_id, attrs: new_attrs}])
            }
        }

        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (document.activeElement.tagName === 'TEXTAREA') {
                return;
            }
                
            if (selectedShape) {
                if(selectedShape.getClassName() === 'Rect') {
                    const rect_id = selectedShape.getId();
                    // console.log("rectangle ID ",rect_id,selectedShape)
                    const updatedArray = rectanglesPos.filter(rect => rect.id !== rect_id);
                    setRectanglesPos(updatedArray);
                }
                else if(selectedShape.getClassName() === 'Circle') {
                    const circle_id = selectedShape.getId();
                    // console.log("rectangle ID ",rect_id,selectedShape)
                    const updatedArray = circlesPos.filter(circle => circle.id !== circle_id);
                    setCirclesPos(updatedArray);                    
                }
                else if(selectedShape.getClassName() === 'Text') {
                    const text_id = selectedShape.getId();                    
                    const updatedArray = texts.filter(text => text.id !== text_id);
                    setTexts(updatedArray);   
                }
                else if(selectedShape.getClassName() === 'Line') {
                    const line_id = selectedShape.getId();                    
                    const updatedArray = lines.filter(line => line.id !== line_id);
                    setLines(updatedArray);   
                }
                else if(selectedShape.getClassName() === 'Arrow') {
                    const arrow_id = selectedShape.getId();                    
                    const updatedArray = arrows.filter(arrow => arrow.id !== arrow_id);
                    setArrows(updatedArray);   
                }
                
                setSelectedShape(null);
            }
        }
        
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
          window.removeEventListener('keydown', handleKeyDown);
      };
     }, [selectedShape,clipboard,rectanglesPos, circlesPos, texts]);

  useEffect(() => {        
      if (transformerRef.current && selectedShape) {
        // if(selectedShape.getClassName() !== 'Line' && selectedShape.getClassName() !== 'Arrow'){
          transformerRef.current.nodes([selectedShape]);
          transformerRef.current.getLayer().batchDraw();
        // }
      }      
    }, [selectedShape]);

  useEffect(() => {            
      const updateDimensions = () => {
          setDimensions({
              width: window.innerWidth,
              height: window.innerHeight,
          });
      };
      updateDimensions();     
//---------------load data from local storage-------------------------------

      // Load rectangles
    const savedRectangles = localStorage.getItem('rectangles');
    if (savedRectangles) {
        setRectanglesPos(JSON.parse(savedRectangles));
    }

    // Load circles
    const savedCircles = localStorage.getItem('circle');
    if (savedCircles) {
        setCirclesPos(JSON.parse(savedCircles));
    }

    // Load lines
    const savedLines = localStorage.getItem('line');
    if (savedLines) {
        setLines(JSON.parse(savedLines));
    }

    // Load arrows
    const savedArrows = localStorage.getItem('arrow');
    if (savedArrows) {
        setArrows(JSON.parse(savedArrows));
    }

    // Load pen drawings
    const savedPen = localStorage.getItem('pen');
    if (savedPen) {
        setPen(JSON.parse(savedPen));
    }

    // load text
    const savedText = localStorage.getItem('text');
    if (savedText) {
        setTexts(JSON.parse(savedText));
    }

//-----------------------------------------------------------------

      window.addEventListener('resize', updateDimensions);    
      return () => {
          window.removeEventListener('resize', updateDimensions);
      };


    }, []);


    
// --------------------------Draw shape on screen ------------------------------------
    function handleClick(e) {      
        
        if (e.target === e.target.getStage()) {
            setSelectedShape(null);
        } else if (e.target) {
            // if(e.target.getClassName() !== 'Line' && e.target.getClassName() !== 'Arrow'){
                setSelectedShape(e.target);
            // }
            
        }  
        if (isClicked === 'text') {
            
            const pos = e.target.getStage().getPointerPosition();
            setInputPos({ x: pos.x, y: pos.y });
        } else if (isClicked === 'rectangle') {
            const pos = e.target.getStage().getPointerPosition();
            const tempId = nanoid();
            setRectanglesPos([...rectanglesPos, {id:tempId,attrs:{ x: pos.x, y: pos.y, width:150, height:80, text:null, textHeight: null}}]);
            setClicked('selector');
        } else if (isClicked === 'circle') {
            const pos = e.target.getStage().getPointerPosition();
            const tempId = nanoid();
            setCirclesPos([...circlesPos, {id:tempId,attrs:{ x: pos.x, y: pos.y, radius:80, scaleX: 1, scaleY: 1, rotation:0, text:null}}]);
            setClicked('selector');
        } else if (isClicked === 'line') {
            // console.log("drawing status ",isDrawing);
            if(!isDrawing[0]){
                const pos = e.target.getStage().getPointerPosition();
                const tempId = nanoid();                
                setLines([...lines,{id: tempId, attrs:{ points: [pos.x, pos.y] }}]);                
                setIsDrawing([true,tempId]);
                
            }else{                
                setIsDrawing([false,null]);
                setClicked('selector');
            }
            
        } else if (isClicked === 'arrow') {
            // console.log("drawing status ",isDrawing);
            if(!isDrawing[0]){
                const pos = e.target.getStage().getPointerPosition();
                const tempId = nanoid();                
                setArrows([...arrows,{id: tempId, attrs:{ points: [pos.x, pos.y] ,text:""}}]);                
                setIsDrawing([true,tempId]);
                
            }
            else{                
                setIsDrawing([false,null]);
                setClicked('selector');
            }
            
        } else if (isClicked === 'pen') {
            
            const pos = e.target.getStage().getPointerPosition();
            const tempId = nanoid();                
            setPen([...pen,{id: tempId, attrs:{ points: [pos.x, pos.y] }}]);                
            setIsDrawing([true,tempId]);
        }
        else if (isClicked === 'eraser') {
            console.log("handle click called ...")
            setIsDrawing([true,null]);                             
        }

//         
    }

//-----------------------------drag function-------------------------

    function handleDragEnd(e){
    
        const shape = e.target.children?.[0] || e.target;
        
        const shape_name = e.target.children?.[0].getClassName() || e.target.getClassName();
        if(shape_name === 'Rect'){
            
            // setRectanglesPos(rectanglesPos.map(rect =>
            //     rect.id === shape.id() ? {
            //         ...rect,
            //         attrs:{...rect.attrs, x: shape.getClientRect().x, y: shape.getClientRect().y}
            //     }
            //     :rect));

            // for draging attached shape
        
            
            



        }
        else if(shape_name === 'Circle'){
            setCirclesPos(circlesPos.map(circle =>
                circle.id === shape.id() ? {
                    ...circle,
                    attrs:{...circle.attrs, x: shape.getClientRect().x, y: shape.getClientRect().y}
                }
                :circle));
            }
        else if(shape_name === 'Text'){
            setTexts(texts.map(text =>
                text.id === shape.id() ? {
                    ...text,
                    attrs:{...text.attrs, x: shape.getClientRect().x, y: shape.getClientRect().y}
                }
                :text));
            }
                    
        else if (shape_name === 'Line') {
            
                const newPoints = shape.points();
                setLines(lines.map(line =>
                    line.id === shape.id() ? { ...line, attrs: { ...line.attrs, points: newPoints } } : line
                ));
            }
        else if (shape_name === 'Arrow') {
            
    }
}

    function arrowLineAdjust(e,position,shape){
        
        const new_x = e.target.x();
        const new_y = e.target.y();
        console.log("drag ...Arrow.. ",e.target.getClassName())
        if(shape  === "Arrow"){
            setArrows(arrows.map(
                arrow=> arrow.id === selectedShape.id() 
                    ?{
                        ...arrow,
                            attrs : {
                                ...arrow.attrs,
                                points: position === 1
                                ? [arrow.attrs.points[0], arrow.attrs.points[1], new_x, new_y] // Update end point
                                : [new_x, new_y, arrow.attrs.points[2], arrow.attrs.points[3]], // Update start point
                                middle_point: position === 1
                                ? [(arrow.attrs.points[0]+ new_x)/2, (arrow.attrs.points[1] + new_y)/2]
                                : [(arrow.attrs.points[2]+ new_x)/2, (arrow.attrs.points[3] + new_y)/2]
                            },
                        }
                        : arrow
                    ));
            }
            else if(shape === "Line"){
                setLines(lines.map(
                    line=> line.id === selectedShape.id() 
                        ?{
                            ...line,
                                attrs : {
                                    ...line.attrs,
                                    points: position === 1
                                    ? [line.attrs.points[0], line.attrs.points[1], new_x, new_y] // Update end point
                                    : [new_x, new_y, line.attrs.points[2], line.attrs.points[3]], // Update start point
                                    
                                },
                            }
                            : line  
                        ));

            }
        // setSelectedShape(null)
    }
//------------------------------Text input funtions------------------------------------
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        
        spanRef.current.style.fontSize = `${inputSize.fontsize}px`;
        spanRef.current.style.fontFamily = inputSize.fontfamily;
        spanRef.current.textContent = value;

        const updatedWidth = spanRef.current.offsetWidth;
        setInputSize({ ...inputSize, width: updatedWidth });
    };    


    function handleInputBlur() {
        
        if (inputValue.trim() !== '') {            
            const ele_index = texts.findIndex(text => text.id == text_id);
            if(ele_index !== -1){
                let arr = [...texts];
                arr[ele_index] = { ...arr[ele_index], attrs: { ...arr[ele_index].attrs, text: inputValue } };
                setTexts(arr);
            }
            else{
                const tempId = nanoid();
                setTexts([...texts, {id:tempId,attrs:{ x: inputPos.x, y: inputPos.y, text: inputValue }}]);
            }         
        }
        else{
            const updatedArray = texts.filter(text => text.id !== text_id);
            setTexts(updatedArray);  
        }
        
        setInputPos(null);
        setInputValue('');
        setTextId(null);
        setInputSize({width:5,fontsize:20});
        setClicked('selector');        

        // setTimeout(() => {
        //     setInputPos(null);
        //     setInputValue('');
        //     setTextId(null);
        //     setInputSize({width:5, fontsize:16});
        //     setClicked('selector');
        // }, 5000); // A slight delay might prevent immediate unmount
       
    }

// --------------------Tranformation functions ---------------------------------------------------
function handleTransform(e){

    const shape = e.target;

    if (shape.getClassName() === "Rect") {
        const { width, height, scaleX = 1, scaleY = 1 } = shape.attrs;
        const newWidth = width * scaleX;
        const newHeight = height * scaleY;
        setRectanglesPos(prevRectangles =>
            prevRectangles.map(rect =>
                rect.id === shape.id()
                    ? { ...rect, attrs: { ...rect.attrs, width: newWidth, height: newHeight } }
                    : rect
            )
        );
    }
    else if(shape.getClassName() === "Circle"){
        
        const scale_x = shape.attrs.scaleX
        const scale_y = shape.attrs.scaleY
        const rotate = shape.attrs.rotation
        setCirclesPos(circlesPos.map(circle =>
             circle.id === shape.id() ? {
                ...circle,
            attrs: {...circle.attrs,
                 scaleX: scale_x,
                  scaleY: scale_y,
                   rotation: rotate}}: circle));
    }
}

function handleTransformEnd(e){
    // console.log("e. target -- ",e.target)
    // console.log("getclient ",e.target.getClientRect())
}

// -------------------------Circle text handleing functions -------------------------------------------------------------

// function handleCircleDblClick(e){
    
// }

// -------------------------Rectangle text handleing functions ----------------------------------------------------------
    function handleTextDoubleClick(e){
        // if(e.target.getClassName() === 'Text'){
            
        setInputPos({ x: e.target.attrs.x, y: e.target.attrs.y });
        setTextId(e.target.getId());
        
        const updated_size = e.target.getClientRect()
        const scaledWidth = updated_size.width;                
        const scaledFontSize = e.target.fontSize() * (e.target.scaleX() + e.target.scaleY()) / 2;
        const fontFamily = e.target.fontFamily()

        setInputSize({width:scaledWidth, fontsize:scaledFontSize, fontfamily: fontFamily });
        setSelectedShape(null);
        setInputValue(e.target.attrs.text);
        
    }

    function handleDblClick(e){        
        console.log("arrow");
        const shape_name = e.target.getClassName()
        if(shape_name === 'Rect'){
            const shape = e.target.getClientRect();        
            const new_y = shape.y + (shape.height/2);   
            setTranslate(-(30/2)) // setting translate to zero .....
            setDoubleClicked({x: shape.x, 
                y: new_y, 
                width: shape.width, 
                height: shape.height, 
                shape_id: e.target.getId(), 
                shape_name: shape_name,
                text_value: e.target.parent.children[1]?.attrs?.text || ""})
            setSelectedShape(null)

        }else if(shape_name === 'Arrow'){
            // console.log("arrow",e.target,e.target.id());
            setSelectedShape(null);
            const arrow_id = e.target.id();
            const arrow = arrows.find(arrow=> arrow.id === arrow_id);
            setTranslate(8)
            setDoubleClicked({x: arrow.attrs.middle_point[0] - 50,
                 y: arrow.attrs.middle_point[1], 
                 width: 100,
                 height: 16,
                 shape_id: arrow_id,
                 shape_name: shape_name,
                 text_value: arrow.attrs.text })

        }
        
    }
// for Arrow text 
    // function handleArrowDblClick(e){
    //     console.log("arrow clicked ",e.target)
    // }

    function handleTextAreaHeight(e) {
        const textarea = e.target;
        
        textarea.style.height = 'auto';
        const newHeight = textarea.scrollHeight;
        
        // Apply the new height
        textarea.style.height = `${newHeight}px`;        
    
        setHeight(newHeight);
    
        if (newHeight >= doubleClicked.height) {
            setRectanglesPos(prevRectangles =>
                prevRectangles.map(rect =>
                    rect.id === doubleClicked.shape_id ? {
                        ...rect,
                        attrs: { ...rect.attrs, height: newHeight + 7.5 }
                    } : rect
                )
            );
        } else {
            setTranslate(-newHeight / 2);
        }
    }

// -------------------------------------------------calculate angle ---------------------------------
    
// this code is for find angle between axis and arrow inclinaion
    // function calculateAngle(x1, y1, x2, y2) {       
        //     const dx = x2 - x1;
        //     const dy = y2 - y1;
        
        //     const radians = Math.atan2(dy, dx);
            
        //     const degrees = radians * (180 / Math.PI);

        //     return degrees;
    // }

    function handleTextAreaBlur(e){
        // console.log("in rect text blur",doubleClicked);
        if(doubleClicked.shape_name === "Rect"){
            
            setRectanglesPos(prevRectangles =>
                prevRectangles.map(rect => rect.id === doubleClicked.shape_id ? { ...rect, attrs: { ...rect.attrs, text: textareaRef.current.value ,textHeight: height}} : rect));            
        }
        else if(doubleClicked.shape_name === "Arrow"){
            // const arrow = arrows.find(arrow => arrow.id === doubleClicked.shape_id)
            // let angle = calculateAngle(arrow.attrs.points[0],arrow.attrs.points[1],arrow.attrs.points[2],arrow.attrs.points[3]);
            // console.log("angle .. ",angle);
            // if(angle >= 90 && angle <= 180){
            //     angle = 0;
            // }
            textAreaSpanRef.current.textContent = textareaRef.current.value;
            
            // console.log("text area height :",textareaRef.current.clientHeight);
            
            setArrows(arrows.map(arrow =>
                 arrow.id === doubleClicked.shape_id ?
                  { ...arrow, attrs: { ...arrow.attrs, text: textareaRef.current.value ,rotation:0,
                                            text_width: textAreaSpanRef.current.offsetWidth+5, 
                                            text_height: textareaRef.current.scrollHeight}} 
                  : arrow ))
        }
        setDoubleClicked(null);
        setTranslate(-30/2)
        setHeight(30);
        
    }
// ----------------------------Mouse movement functions------------------------------------------------

    function handleMouseMove(e){
        // console.log("mouse is drawing")
        const pos = e.target.getStage().getPointerPosition();

        
        if(isClicked==='line'){

            if(isDrawing[0]){                
                if(e.target.getClassName() === 'Rect'){                    
                    const rect_id = e.target.id();

                    if (!isAttach[0] || (isAttach[0] && isAttach[1] !== rect_id)) {                        
                        // const rx =  pos.x - rect.x
                        setAttach([true, rect_id]);
                        setRectanglesPos(rectanglesPos.map(rect => 
                            rect.id === rect_id  ?
                            {
                                ...rect,
                                attrs:{...rect.attrs},
                                attach:[{attached_shape_id : isDrawing[1] ,relativeX: (pos.x - rect.attrs.x) ,relativeY: (pos.y - rect.attrs.y)}]
                            }                        
                            : rect ));                        
                    }                    
                }else{
                    if (isAttach[0]) {                        
                    setAttach([false,null]);
                }
                setLines(lines.map(line => 
                    line.id === isDrawing[1] ? 
                    {
                        ...line, 
                        attrs: {
                            ...line.attrs, 
                            points: [...line.attrs.points.slice(0,2) ,pos.x,pos.y]
                        }
                    } 
                    : line
                ));
            }

            }
        }
//--------------for arrow ------------
        else if(isClicked==='arrow'){

            if(isDrawing[0]){                
                
                setArrows(arrows.map(arrow => 
                    arrow.id === isDrawing[1] ? 
                    {
                        ...arrow, 
                        attrs: {
                            ...arrow.attrs, 
                            points: [...arrow.attrs.points.slice(0,2) ,pos.x,pos.y],
                            middle_point: [
                                (arrow.attrs.points[0] + pos.x) / 2, // Midpoint x
                                (arrow.attrs.points[1] + pos.y) / 2  // Midpoint y
                            ]
                        }
                    } 
                    : arrow
                ));

            }
        }
        else if(isClicked==='pen'){
            if(isDrawing[0]){                
                setPen(pen.map(p => 
                    p.id === isDrawing[1] ? 
                    {
                        ...p, 
                        attrs: {
                            ...p.attrs, 
                            points: [...p.attrs.points,pos.x,pos.y]
                        }
                    } 
                    : p
                ));

            }
        }else if(isClicked === 'eraser'){
            const x_ = pos.x;
            const y_ = pos.y;
            setEraser({x: x_,y: y_});
            const shape_name = e.target.getClassName()
            
            if (shape_name === "Rect" || shape_name === "Circle" || shape_name === "Arrow" || shape_name === "Line"){
                
                if(isDrawing[0] === true){                
                    console.log("in eraser",shape_name)                
                    const shape_id = e.target.id()                    
                    eraseShape(shape_name, shape_id);
                }
            }
        }
    }

const eraseShape = (shape,id)=>{
    console.log("eraser calles",shape,id)
    if(shape === 'Rect') {                
        const updatedArray = rectanglesPos.filter(rect => rect.id !== id);
        setRectanglesPos(updatedArray);
    }
    else if(shape === 'Circle') {
        const updatedArray = circlesPos.filter(circle => circle.id !== id);
        setCirclesPos(updatedArray);                    
    }
    else if(shape === 'Text') {                 
        const updatedArray = texts.filter(text => text.id !== id);
        setTexts(updatedArray);   
    }
    else if(shape === 'Line') {                 
        let updatedArray = lines.filter(line => line.id !== id);
        setLines(updatedArray); 
        updatedArray = pen.filter(pen => pen.id !== id);
        setPen(updatedArray);   
    }
    else if(shape === 'Arrow') {               
        const updatedArray = arrows.filter(arrow => arrow.id !== id);
        setArrows(updatedArray);   
    }
}


    function handleMouseUp(e){
        // console.log("in mouse up ",e.target,e.target.getClassName())
        if(isClicked==='line' || isClicked==='arrow' ){ 

            setAttach([false,null]);
        }
        if(isClicked==='pen' || isClicked==='eraser' ){
            setIsDrawing([false,null]);
            handleMouseLeave(e) // setting curose back to default
        }
        
    }
  

// ------------------------------------------for mouse cursor ------------------------------
    const handleMouseEnter = (event) => {
        // Change cursor when mouse enters the Group
        event.target.getStage().container().style.cursor = 'move';
      };
    
      const handleMouseLeave = (event) => {
        // Reset cursor when mouse leaves the Group
        event.target.getStage().container().style.cursor = 'default';
      };

    return (
        <>
        {showAlert && 
        <span className='flex items-center justify-between text-center w-[210px] absolute top-5 right-5  px-3 py-3 border border-[#c3e6cb] text-[#155724] bg-[#d4edda] rounded-xl '> 
        <span ><i className="fa-solid fa-circle-check text-[#28a745] "></i></span>
        <span >saved successfully </span>
        </span>}
            <Stage                 
                className='bg-[#f9fafc]'   
                width={dimensions.width} 
                height={dimensions.height}                 
                ref={stageRef}
                onMouseDown={(isClicked === "pen" || isClicked === "eraser") && handleClick}
                onClick={isClicked !== "pen" && handleClick}
                onMousemove={(e)=> (isDrawing[0] || isClicked === "eraser") && handleMouseMove(e)}
                onMouseUp={handleMouseUp}
                >
                <Layer>
                    {rectanglesPos.map((rect_pos) => (                                                            
                        <Group
                                key={rect_pos.id}
                                x={rect_pos.attrs.x}
                                y={rect_pos.attrs.y}
                                draggable
                                onDragEnd={handleDragEnd}
                        >                            
                            <Rect
                                id={rect_pos.id}
                                key={rect_pos.id}                                                                
                                width={rect_pos.attrs.width}
                                height={rect_pos.attrs.height}                
                                stroke="black"
                                shadowColor='black'
                                shadowBlur={3}
                                shadowOffsetX={2}
                                shadowOffsetY={2}                                
                                fill="white"   
                                cornerRadius={15}           
                                strokeWidth={1}                                                                                                
                                // hitStrokeWidth={10}
                                onDblClick={handleDblClick}                                                                                                
                            />
                            {(isAttach[0] && isAttach[1] === rect_pos.id) && 
                            <Rect                                
                                width={rect_pos.attrs.width + 12}
                                height={rect_pos.attrs.height + 12}       
                                offsetX={5}
                                offsetY={5}
                                strokeWidth={7}
                                stroke={'#B2BEB5'}
                                cornerRadius={15}
                                shadowBlur={15}
                                shadowColor='#4374dd'
                                listening={false}
                            />}
                            <Text
                                id={"rect_text"+rect_pos.id}
                                key={"rect_text"+rect_pos.id}                                                                                    
                                height={rect_pos.attrs.height}
                                width={rect_pos.attrs.width}                                
                                text={rect_pos.attrs.text}                       
                                fontSize={16}                                
                                fontFamily={'Courier New'}
                                fontStyle='bold'
                                fill='black'                                                                
                                align="center"         
                                verticalAlign="middle"
                                // opacity={1}                       
                                listening = {false}
                                visible={(rect_pos.attrs.text || rect_pos.attrs.text==="") && (!doubleClicked || doubleClicked.shape_id !== rect_pos.id)}                                
                                // onDblClick={handleTextDoubleClick}                                                    
                            />                             
                        </Group>

                    ))}

                    {circlesPos.map((circle_pos) => (
                        <Group
                            key={circle_pos.id}
                            x={circle_pos.attrs.x}
                            y={circle_pos.attrs.y}
                            // hitStrokeWidth={6}
                            draggable
                        >                
                        <Circle
                            id={circle_pos.id}
                            key={circle_pos.id}
                            radius={circle_pos.attrs.radius}
                            stroke="black"
                            shadowColor='black'
                            shadowBlur={3}
                            shadowOffsetX={2}
                            shadowOffsetY={2}
                            fill="white"

                            strokeWidth={1}
                            hitStrokeWidth={6}
                            rotation={circle_pos.attrs.rotation}
                            scaleX= {circle_pos.attrs.scaleX}
                            scaleY= {circle_pos.attrs.scaleY}           
                            // onDblClick={handleCircleDblClick}                                            
                        />
                        <Text
                            id={"circle_text"+circle_pos.id}
                            key={"circle_text"+circle_pos.id}                                                                                    
                            // height={rect_pos.attrs.height}
                            // width={rect_pos.attrs.width}                                
                            // text={circle_pos.attrs.text}                       
                            text={"h"}      
                            fontSize={16}                                
                            fontFamily={'Courier New, Monaco'}
                            fill='black'                                
                            align="center"         
                            verticalAlign="middle"
                            offsetX={50}            
                            listening = {false}
                            // visible={(rect_pos.attrs.text || rect_pos.attrs.text==="") && (!doubleClicked || doubleClicked.shape_id !== rect_pos.id)}                                
                            visible={false}
                            // onDblClick={handleTextDoubleClick}                                                    
                        />        

                           
                        </Group>
                    ))}

    {/* Line          */}
                    {lines.map(line => 
                    <Group
                        key={line.id}
                        id={line.id}
                        draggable                          
                        onDragEnd={handleDragEnd}  
                        onMouseEnter={!isDrawing[0] ? handleMouseEnter : ''}
                        onMouseLeave={!isDrawing[0] ? handleMouseLeave : ''}
                    >
                
                        <Line
                            id={line.id}
                            key={line.id}
                            points={line.attrs.points}
                            stroke="black"
                            // shadowColor='black'
                            //     shadowBlur={3}
                            //     shadowOffsetX={3}
                            //     shadowOffsetY={2}
                            strokeWidth={2}
                            hitStrokeWidth={6}
                            
                            lineCap="round"
                            lineJoin="round"                                                        
                        />
                    
                    {(selectedShape && selectedShape.id() === line.id) &&  <>
                                <Circle
                                    key={`circle-start-${line.id}`}
                                    x={line.attrs.points[0]}
                                    y={line.attrs.points[1]}
                                    radius={6}
                                    fill="#4374dd"                                            
                                    stroke="#4374dd"
                                    shadowColor='#4374dd'
                                    shadowBlur={4}
                                    shadowOffsetX={2}
                                    shadowOffsetY={2}                                    
                                    strokeWidth={1}
                                    hitStrokeWidth={6}
                                    draggable
                                    onDragStart={(e) => {
                                        e.cancelBubble = true; // Prevent parent group from dragging
                                    }}
                                    onDragMove={(e) => {
                                        e.cancelBubble = true; // Prevent parent group from dragging
                                        arrowLineAdjust(e, 0,'Line'); // Adjust the start point of the arrow
                                }}
                                />
                                <Line
                                    id={line.id}
                                    key={line.id}
                                    points={line.attrs.points}
                                    stroke="#4374dd"                                            
                                    strokeWidth={3}
                                    lineCap="round"
                                    lineJoin="round"
                                    hitStrokeWidth={6}
                                    listening={false}
                                />
                                <Circle
                                    key={`circle-end-${line.id}`}
                                    x={line.attrs.points[2]}
                                    y={line.attrs.points[3]}
                                    radius={6}
                                    fill="#4374dd"                                            
                                    stroke="#4374dd"                                                                        
                                    shadowColor='#4374dd'
                                    shadowBlur={4}
                                    shadowOffsetX={2}
                                    shadowOffsetY={2}
                                    strokeWidth={1}
                                    hitStrokeWidth={6}
                                    draggable
                                    onDragStart={(e) => {
                                        e.cancelBubble = true; // Prevent parent group from dragging
                                    }}
                                    onDragMove={(e) => {
                                        e.cancelBubble = true; // Prevent parent group from dragging
                                        arrowLineAdjust(e, 1,'Line'); // Adjust the end point of the arrow
                                }}
                                />
                            </>
                            }
                        </Group>
                     )} 
    {/* arrow                       */}
                     {arrows.map(arrow => 
                        <Group
                            key={arrow.id}
                            id={arrow.id}                            
                            draggable                                                            
                            onDragEnd={handleDragEnd}  
                            onDblClick={handleDblClick}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                                
                                <Arrow
                                    id={arrow.id}
                                    key={arrow.id}
                                    points={arrow.attrs.points}
                                    stroke="black"                                
                                    strokeWidth={2}
                                    lineCap="round"
                                    lineJoin="round"
                                    hitStrokeWidth={6}
                                />
                            
                                {arrow.attrs.middle_point && 
                                <Text
                                    x={arrow.attrs.middle_point[0]}
                                    y={arrow.attrs.middle_point[1]}                                    
                                    width={arrow.attrs.text_width}
                                    text={arrow.attrs.text}                                          
                                    fontSize={16}                                
                                    fontFamily={'Courier New'}
                                    fontStyle='bold'
                                    fill='black'                                              
                                    align="center"         
                                    verticalAlign="middle"                                                
                                    offsetX={arrow.attrs.text_width/2 ||10}          
                                    offsetY={arrow.attrs.text_height/2 || 10}            
                                    listening = {false}
                                    visible={(doubleClicked && doubleClicked.shape_id === arrow.id) ? false :true}
                                />}
            
                                {(selectedShape && selectedShape.id() === arrow.id) &&  <>
                                        <Circle
                                            key={`circle-start-${arrow.id}`}
                                            x={arrow.attrs.points[0]}
                                            y={arrow.attrs.points[1]}
                                            radius={6}
                                            fill="#4374dd"                                            
                                            stroke="#4374dd"
                                            shadowColor='#4374dd'
                                            shadowBlur={4}
                                            shadowOffsetX={2}
                                            shadowOffsetY={2}
                                            strokeWidth={1}
                                            hitStrokeWidth={6}
                                            draggable
                                            onDragStart={(e) => {
                                                e.cancelBubble = true; // Prevent parent group from dragging
                                            }}
                                            onDragMove={(e) => {
                                                e.cancelBubble = true; // Prevent parent group from dragging
                                                arrowLineAdjust(e, 0,'Arrow'); // Adjust the start point of the arrow
                                        }}
                                        />
                                         <Line
                                            id={arrow.id}
                                            key={arrow.id}
                                            points={arrow.attrs.points}
                                            stroke="#4374dd"                                            
                                            strokeWidth={3}
                                            lineCap="round"
                                            lineJoin="round"
                                            hitStrokeWidth={6}
                                            listening={false}
                                        />
                                        <Circle
                                            key={`circle-end-${arrow.id}`}
                                            x={arrow.attrs.points[2]}
                                            y={arrow.attrs.points[3]}
                                            radius={6}
                                            rotation={45}
                                            fill="#4374dd"                                            
                                            stroke="#4374dd"
                                            shadowColor='#4374dd'
                                            shadowBlur={4}
                                            shadowOffsetX={2}
                                            shadowOffsetY={2}
                                            strokeWidth={1}
                                            hitStrokeWidth={6}
                                            draggable
                                            onDragStart={(e) => {
                                                e.cancelBubble = true; // Prevent parent group from dragging
                                            }}
                                            onDragMove={(e) => {
                                                // e.cancelBubble = true; // Prevent parent group from dragging
                                                arrowLineAdjust(e, 1,'Arrow'); // Adjust the end point of the arrow
                                        }}
                                        />
                                    </>
                                    }
                       
                            </Group>
                
                        )} 
{/* --------pen --------------- */}
                        {pen.map(p => 
                        <Group
                            key={p.id}
                            id={p.id}
                            // draggable                          
                            // onDragEnd={handleDragEnd}  
                        >
                            <Line
                                id={p.id}
                                key={p.id}
                                points={p.attrs.points}
                                stroke="black"
                                strokeWidth={5}
                                lineCap="round"
                                lineJoin="round"                                                            
                            />
                            </Group>
                        )} 
{/* -------text------------------- */}

                    {texts.map((textItem) => (                        
                        <Text
                            id={textItem.id}
                            key={textItem.id}
                            x={textItem.attrs.x}
                            y={textItem.attrs.y}                
                            text={textItem.attrs.text}                            
                            fontSize={textItem.attrs.fontSize || 30}
                            fontFamily={textItem.attrs.fontFamily || 'serif'}
                            fill='black'
                            onDblClick={handleTextDoubleClick}
                            draggable                               
                            visible= {text_id===textItem.id ? false : true }                                                   
                            onDragEnd={handleDragEnd}                            
                            hitStrokeWidth={6}
                            />
                    ))}

        {/* Eraser -------------------------- */}

                    {isClicked === "eraser" &&
                        <Circle
                            key={"eraser"}
                            x={eraser.x }
                            y={eraser.y }
                            radius={10}
                            fill="gray"
                            shadowBlur={3}
                            strokeWidth={1}
                            hitStrokeWidth={6}
                            listening={false}
                        />
                    }
                    {selectedShape && (selectedShape.getClassName() !== "Line" && selectedShape.getClassName() !== "Arrow")  && (
                      <Transformer
                        ref={transformerRef}
                        boundBoxFunc={(oldBox, newBox) => {
                          // Limit resize and rotate
                          if (newBox.width < 10 || newBox.height < 10) {
                            return oldBox;
                          }
                          return newBox;
                        }}
                        onTransform={handleTransform}
                        onTransformEnd={handleTransformEnd}
                      />
                    )} 

                </Layer>
            </Stage>
            {inputPos && (
              <>
                <input
                    ref={inputRef}
                    style={{
                        top: `${inputPos.y}px`,
                        left: `${inputPos.x}px`,
                        width: `${inputSize.width + 3}px`,
                        position: 'absolute',
                        backgroundColor: '#f9fafc',                        
                        color:'black',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontSize: `${inputSize.fontsize}px`,
                        fontFamily: `${inputSize.fontfamily}`,
                        caretColor:'black'
                                                
                    }}  
                    
                    value={inputValue}
                    // onChange={(e) => setInputValue(e.target.value)}
                    onChange={handleInputChange}
                    onBlur={()=> handleInputBlur()}
                    autoFocus
                />
                <span ref={spanRef} style={{
                            position: 'absolute',
                            visibility: 'hidden',
                            whiteSpace: 'pre',
                        }} className='invisible'></span>
                </>
                
            )}
{/* -------------------------text area for rectangle and cirlce */}
        {doubleClicked && (
            <>
            <textarea
                ref={textareaRef}
                key={'rect_text_area'+ doubleClicked.shape_id }
                style={{ 
                    position: 'absolute',
                    top: `${doubleClicked.y }px`,
                    left: `${doubleClicked.x +3.5}px`,
                    height: `${height}px`,
                    resize: 'none',
                    overflow: 'hidden',
                    width: `${doubleClicked.width-7}px`,
                    boxSizing: 'border-box',
                    transform: `translate(0, ${parseInt(translate)}px)`,
                    // transform: `{height.translate}`,                    
                    outline: 'none',
                    background:'#f9fafc',
                    caret:'black',
                    color:"black",
                    fontSize:'16px',
                    fontSize:'serif',
                    textAlign: 'center',
                    // lineHeight: 'normal',
                    borderRadius: '8px',

                }}
                onKeyDown={(e) => {
                    if (e.key === 'Backspace' || e.key === 'Delete') {
                        e.stopPropagation();
                    }
                }}
                onChange={handleTextAreaHeight}
                onBlur={handleTextAreaBlur}
                autoFocus
                />
                
                <span ref={textAreaSpanRef} style={{
                            position: 'absolute',
                            visibility: 'hidden',
                            whiteSpace: 'pre',
                            maxWidth: '100px'
                        }} className='invisible'></span>
                </>
            )}
            
        </>
    );
}

