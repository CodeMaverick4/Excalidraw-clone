'use client';
import { nanoid } from 'nanoid';
import { withCoalescedInvoke } from 'next/dist/lib/coalesced-function';
import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line ,Group,Transformer} from 'react-konva';

export default function Canvas_cmp({ isClicked, setClicked }) {    
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    
    const [rectanglesPos, setRectanglesPos] = useState([]);
    const [doubleClicked, setDoubleClicked] = useState(null); // for rect ,circle text area 
    const [height, setHeight] = useState(30);
    const [translate, setTranslate] = useState(0);

    const [circlesPos, setCirclesPos] = useState([]);
    // const [textsPos, setTextsPos] = useState([]);
    const [inputPos, setInputPos] = useState(null);
    const [text_id,setTextId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    // const [inputWidth, setInputWidth] = useState(5);
    const [inputSize, setInputSize] = useState({width:5,fontsize:16});
    const [texts, setTexts] = useState([]);
    
    const [draggingShape, setDraggingShape] = useState(null);
    // const [draggingPos, setDraggingPos] = useState({ x: 0, y: 0 });

    const [selectedShape,setSelectedShape] = useState(null);
    
    const inputRef = useRef(null); // for text input
    const spanRef = useRef(null); // for input text width 
    const textareaRef = useRef(null);
    const transformerRef = useRef(null); // for resize 

    // useEffect(()=>{
    //     if(textareaRef.current){
    //         textareaRef.current.value = doubleClicked.text_value
    //         setHeight(textareaRef.current.scrollHeight)
    //         setTranslate(-textareaRef.current.scrollHeight/2)
    //     }
        
    // },[doubleClicked])


  useEffect(() => {
    
      const handleKeyDown = (e) => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
        
        
            // Check if the active element is a textarea
        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (document.activeElement.tagName === 'TEXTAREA') {
                return; // Do nothing if the focus is on a textarea
            }
            console.log("delete event called")
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
     }, [selectedShape]);

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
    
    // ------------------------------------
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        
        spanRef.current.style.fontSize = `${inputSize.fontsize}px`;
        spanRef.current.style.fontFamily = inputSize.fontfamily;
        spanRef.current.textContent = value;

        const updatedWidth = spanRef.current.offsetWidth;
        setInputSize({ ...inputSize, width: updatedWidth });
    };
    // --------------------------------------

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
            setCirclesPos([...circlesPos, {id:tempId,attrs:{ x: pos.x, y: pos.y}}]);
            setClicked('selector');
        }
    }

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

    const handleDragStart = (e, type, index) => {
        setDraggingShape({ type, index });
        setDraggingPos({ x: e.target.x(), y: e.target.y() });
    };

    // const handleDragMove = (e) => {
    //     if (draggingShape) {
           
    //         const newPos = { x: e.target.x(), y: e.target.y() };
           
    //         setDraggingPos(newPos);
    //     }
    // };

    // const handleDragEnd = () => {
    //     setDraggingShape(null);
    // };


//   function handleResize(shape){
//     const attrs = shape.target.attrs;
//     if(shape.target.getClassName() === 'Rect' ) {
//       let arr = [...rectanglesPos];
//       arr[selectedShape.index].width = attrs.width + attrs.scaleX;
//       arr[selectedShape.index].height = attrs.height + attrs.scaleY;
//       setRectanglesPos(arr);

//     } else if (shape.target.getClassName() === 'Circle' ) {
//         let arr = [...circlesPos];
//         arr[selectedShape.index].radius = attrs.radius ;
        
//         setCirclesPos(arr);        
//     } else if (shape.target.getClassName() === 'Text' ) { 
//         let arr = [...texts];
//         arr[selectedShape.index].height = attrs.height;
//         arr[selectedShape.index].width = attrs.width;
//         setTexts(arr);
//     }
//     setSelectedShape(null);
//     console.log("after transform ",shape)
//   }

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
        
        // const translate = -(30/2);
        setTranslate(-(30/2)) // setting translate to zero .....
        console.log("rect in asasds",e.target.parent.children[1].getClientRect())
        setDoubleClicked({x: shape.x, y: new_y, width: shape.width, height: shape.height, shape_id: e.target.getId(), text_value: e.target.parent.children[1]?.attrs?.text || ""})
        // setHeight(e.target.parent.children[1]?.getClientRect().height || 30)
        setSelectedShape(null)
        // setDoubleClicked({width: shape.width})
        // const rect = e.target.getClientRect() 
        // setInputPos({ x: rect.x, y: rect.y });  

    }

    function handleTextAreaHeight(e) {
        const textarea = e.target;
        
        // Temporarily set the height to auto to recalculate scrollHeight correctly
        textarea.style.height = 'auto';
        const newHeight = textarea.scrollHeight;
        
        // Apply the new height
        textarea.style.height = `${newHeight}px`;
    
        console.log("New height:", newHeight);
    
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
        console.log("text area value ",textareaRef.current.value)
        if(textareaRef.current.value.trim() !== ""){
            setRectanglesPos(prevRectangles =>
                prevRectangles.map(rect => rect.id === doubleClicked.shape_id ? { ...rect, attrs: { ...rect.attrs, text: textareaRef.current.value ,textHeight: height}} : rect));
        
        }
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
                                // x={rect_pos.attrs.width/2}
                                y={rect_pos.attrs.height/2}
                                width={rect_pos.attrs.width}
                                // offsetX={rect_pos.attrs.textHeight/2}
                                offsetY= {rect_pos.attrs.textHeight/2}
                                text={rect_pos.attrs.text}                       
                                fontSize={16}
                                fontFamily={'serif'}
                                fill='white'                                
                                align="center"                                
                                listening = {false}
                                visible={rect_pos.attrs.text && (!doubleClicked || doubleClicked.shape_id !== rect_pos.id)}
                                
                                // onDblClick={handleTextDoubleClick}
                                                    
                            />
                             

                        </Group>

                    ))}

                    {circlesPos.map((circle_pos) => (
                        <Circle
                            id={circle_pos.id}
                            key={circle_pos.id}
                            x={circle_pos.attrs.x}
                            y={circle_pos.attrs.y}
                            radius={100}
                            stroke="white"
                            fill={'black'}
                            strokeWidth={1}
                            draggable
                            // onDragStart={(e) => handleDragStart(e, 'circle', circle_pos.id)}
                            // onDragMove={handleDragMove}
                            // onDragEnd={handleDragEnd}
                        />
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
                            // onDragEnd={handleDragEnd}                            
                            />
                    ))}
    
                    {selectedShape && (
                      <Transformer
                        ref={transformerRef}
                        boundBoxFunc={(oldBox, newBox) => {
                          // Limit resize and rotate
                          if (newBox.width < 100 || newBox.height < 100) {
                            return oldBox;
                          }
                          return newBox;
                        }}
                        // onTransformEnd={(e)=>handleResize(e)}
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
                        backgroundColor: 'white',                        
                        color:'black',
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
                    background:'white',
                    caret:'white',
                    color:"black",
                    fontSize:'16px',
                    fontSize:'serif',
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

