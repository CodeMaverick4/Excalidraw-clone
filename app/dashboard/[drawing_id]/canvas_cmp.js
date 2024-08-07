'use client';
import { nanoid } from 'nanoid';
import { withCoalescedInvoke } from 'next/dist/lib/coalesced-function';
import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line ,Group,Transformer} from 'react-konva';

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
    
    //text states
    const [inputPos, setInputPos] = useState(null);
    const [text_id,setTextId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [inputSize, setInputSize] = useState({width:5,fontsize:16});
    const [texts, setTexts] = useState([]);
    
    const [selectedShape,setSelectedShape] = useState(null);
    
    const inputRef = useRef(null); // for text input
    const spanRef = useRef(null); // for input text width 
    const textareaRef = useRef(null);
    const transformerRef = useRef(null); // for resize 

    
    useEffect(()=>{
        if(textareaRef.current){
            textareaRef.current.value = doubleClicked.text_value;                      
        }        
    },[doubleClicked])

    // useEffect(()=>{
    //     console.log("circles in useeffect ",JSON.stringify(circlesPos))
        
    // },[circlesPos])
    useEffect(()=>{
        console.log("new rect  useeffect ",rectanglesPos)
        
    },[rectanglesPos])

  useEffect(() => {
    
      const handleKeyDown = (e) => {


        if(e.ctrlKey && e.key === "c" && selectedShape){            
            setClipboard(selectedShape);            
        }
        
        // pasting the copied shape 
        if(clipboard && e.ctrlKey && e.key === "v" ){

            if(clipboard.getClassName() === 'Rect'){
                // console.log("rect it ",clipboard.id());
                let rect_ele = rectanglesPos.find(rect=> rect.id === clipboard.id());
                // console.log("x --- ", rect_ele.attrs.x)

                const new_temp_id = nanoid();

                let new_attrs = { ...rect_ele.attrs, x: rect_ele.attrs.x + 30, y: rect_ele.attrs.y + 30 };

                // console.log("x --- ", rect_ele.attrs.x)
                
                // setClipboard(null);
                setRectanglesPos([...rectanglesPos,{id: new_temp_id, attrs: new_attrs}])
            }
            else if(clipboard.getClassName() === 'Circle'){
                // console.log("circle it ",clipboard.id());
                let circle_ele = circlesPos.find(circle=> circle.id === clipboard.id());
                // console.log("x --- ", circle_ele.attrs.x)

                const new_temp_id = nanoid();

                let new_attrs = { ...circle_ele.attrs, x: circle_ele.attrs.x + 30, y: circle_ele.attrs.y + 30 };

                // console.log("x --- ", circle_ele.attrs.x)
                
                // setClipboard(null);
                setCirclesPos([...circlesPos,{id: new_temp_id, attrs: new_attrs}])

            }
            else if(clipboard.getClassName() === 'Text'){
                // console.log("text it ",clipboard.id());
                let text_ele = texts.find(text=> text.id === clipboard.id());
                // console.log("x --- ", text_ele.attrs.x)

                const new_temp_id = nanoid();

                let new_attrs = { ...text_ele.attrs, x: text_ele.attrs.x + 30, y: text_ele.attrs.y + 30 };

                // console.log("x --- ", text_ele.attrs.x)
                
                // setClipboard(null);
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
                    console.log("text ID ",text_id)
                    const updatedArray = texts.filter(text => text.id !== text_id);
                    setTexts(updatedArray);   
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
          transformerRef.current.nodes([selectedShape]);
          transformerRef.current.getLayer().batchDraw();
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
          setSelectedShape(e.target);
      }  
      if (isClicked === 'text') {
            const pos = e.target.getStage().getPointerPosition();
            setInputPos({ x: pos.x, y: pos.y });
        } else if (isClicked === 'rectangle') {
            const pos = e.target.getStage().getPointerPosition();
            const tempId = nanoid();
            setRectanglesPos([...rectanglesPos, {id:tempId,attrs:{ x: pos.x, y: pos.y, width:200, height:200, text:null, textHeight: null}}]);
            setClicked('selector');
        } else if (isClicked === 'circle') {
            const pos = e.target.getStage().getPointerPosition();
            const tempId = nanoid();
            setCirclesPos([...circlesPos, {id:tempId,attrs:{ x: pos.x, y: pos.y, radius:100, scaleX: 1, scaleY: 1, rotation:0, text:null}}]);
            setClicked('selector');
        }
    }

//-----------------------------drag function-------------------------
function handleDragEnd(e){
    
    const shape = e.target.children?.[0] || e.target;
    const shape_name = e.target.children?.[0].getClassName() || e.target.getClassName();
    // console.log("class name ", shape.x())
    if(shape_name === 'Rect'){
        
        setRectanglesPos(rectanglesPos.map(rect =>
             rect.id === shape.id() ? {
                ...rect,
                attrs:{...rect.attrs, x: shape.getClientRect().x, y: shape.getClientRect().y}
            }
            :rect));
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
        // console.log("in handle input blur ")
        setInputPos(null);
        setInputValue('');
        setTextId(null);
        setInputSize({width:5,fontsize:16});
        setClicked('selector');
        
       
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
        console.log("circle transform ",shape);
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

function handleCircleDblClick(e){
    console.log("circle double clicked ",e.target)
}

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

    function handleRectDblClick(e){        
        const shape = e.target.getClientRect();        
        const new_y = shape.y + (shape.height/2);
        
        setTranslate(-(30/2)) // setting translate to zero .....
        setDoubleClicked({x: shape.x, y: new_y, width: shape.width, height: shape.height, shape_id: e.target.getId(), text_value: e.target.parent.children[1]?.attrs?.text || ""})
        setSelectedShape(null)
        
    }

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

    function handleTextAreaBlur(e){
        
        // if(textareaRef.current.value.trim() !== ""){
            setRectanglesPos(prevRectangles =>
                prevRectangles.map(rect => rect.id === doubleClicked.shape_id ? { ...rect, attrs: { ...rect.attrs, text: textareaRef.current.value ,textHeight: height}} : rect));
        
        // }
        setDoubleClicked(null);
        setTranslate(-30/2)
        setHeight(30);
        
    }

    return (
        <>
            <Stage 
                className='bg-black'   
                width={dimensions.width} 
                height={dimensions.height}                 
                onClick={(e) => handleClick(e)}>
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
                                // x={rect_pos.attrs.x}
                                // y={rect_pos.attrs.y}
                                width={rect_pos.attrs.width}
                                height={rect_pos.attrs.height}                
                                stroke="white"
                                fill={rect_pos.attrs.fill_color}                 
                                cornerRadius={15}           
                                strokeWidth={1}                                
                                // fill="blue"
                                // draggable
                                onDblClick={handleRectDblClick}
                                // onDragStart={(e) => handleDragStart(e, 'rectangle', rect_pos.id)}
                                // onDragMove={handleDragMove}
                                // onDragEnd={handleDragEnd}
                            />
                            <Text
                                id={"rect_text"+rect_pos.id}
                                key={"rect_text"+rect_pos.id}                                                                                    
                                height={rect_pos.attrs.height}
                                width={rect_pos.attrs.width}                                
                                text={rect_pos.attrs.text}                       
                                fontSize={16}                                
                                fontFamily={'Courier New, Monaco'}
                                fill='white'                                
                                align="center"         
                                verticalAlign="middle"
                                opacity={1}                       
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
                            draggable
                        >                
                        <Circle
                            id={circle_pos.id}
                            key={circle_pos.id}
                            // x={circle_pos.attrs.x}
                            // y={circle_pos.attrs.y}
                            radius={circle_pos.attrs.radius}
                            // radius={100}
                            stroke="white"
                            fill={'black'}
                            strokeWidth={1}
                            rotation={circle_pos.attrs.rotation}
                            scaleX= {circle_pos.attrs.scaleX}
                            scaleY= {circle_pos.attrs.scaleY}           
                            onDblClick={handleCircleDblClick}                 
                           
                        />
                        <Text
                                id={"circle_text"+circle_pos.id}
                                key={"circle_text"+circle_pos.id}                                                                                    
                                // height={rect_pos.attrs.height}
                                // width={rect_pos.attrs.width}                                
                                // text={circle_pos.attrs.text}                       
                                text={"hello world"}      
                                fontSize={16}                                
                                fontFamily={'Courier New, Monaco'}
                                fill='white'                                
                                align="center"         
                                verticalAlign="middle"
                                offsetX={50}            
                                listening = {false}
                                // visible={(rect_pos.attrs.text || rect_pos.attrs.text==="") && (!doubleClicked || doubleClicked.shape_id !== rect_pos.id)}                                
                                // onDblClick={handleTextDoubleClick}                                                    
                            />        

                           
                        </Group>
                    ))}

                    
                    
                    {texts.map((textItem) => (
                        // inputPos && (inputPos.x ===  textItem.attrs.x && inputPos.x === textItem.attrs.y)
                        //     ? '' :                        
                        <Text
                            id={textItem.id}
                            key={textItem.id}
                            x={textItem.attrs.x}
                            y={textItem.attrs.y}                
                            text={textItem.attrs.text}                            
                            fontSize={textItem.attrs.fontSize || 16}
                            fontFamily={textItem.attrs.fontFamily || 'serif'}
                            fill='white'
                            onDblClick={handleTextDoubleClick}
                            draggable   
                            // visible={!(inputPos && inputPos.x === textItem.attrs.x && inputPos.y === textItem.attrs.y)}     
                            visible= {text_id===textItem.id ? false : true }                       
                            // onDragStart={(e) => handleDragStart(e, 'text', textItem.id)}
                            // onDragMove={handleDragMove}
                            onDragEnd={handleDragEnd}                            
                            />
                    ))}
    
                    {selectedShape && (
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
                        backgroundColor: 'black',                        
                        color:'white',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontSize: `${inputSize.fontsize}px`,
                        fontFamily: `${inputSize.fontfamily}`,
                        caretColor:'white'
                                                
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
                    background:'black',
                    caret:'white',
                    color:"white",
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
            )}
            
        </>
    );
}

