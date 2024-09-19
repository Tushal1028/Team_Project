import React, { useEffect, useRef, useState } from 'react';
import { Canvas, PencilBrush, Rect, FabricObject, Control, FabricText, FabricImage, Image, loadSVGFromURL, util, loadSVGFromString } from 'fabric';
import SquareTwoToneIcon from '@mui/icons-material/SquareTwoTone';
import singleBed from './Images/elements/single-bed.png'

const FabricDemo = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const itemList = [
        { name: 'Single Bed', path: singleBed },
        // Add more objects here from Images>elements
    ];

    useEffect(() => {
        if (canvasRef.current && containerRef.current) {
            // Get the dimensions of the fabric-canvas div
            const containerRect = containerRef.current.getBoundingClientRect();
            const width = containerRect.width;
            const height = containerRect.height;

            // Set the canvas dimensions to match the fabric-canvas div
            canvasRef.current.width = width;
            canvasRef.current.height = height;
            canvasRef.current.seletion = false;

            // Create a new fabric.js Canvas instance
            const newCanvas = new Canvas(canvasRef.current);

            // Create a PencilBrush and set its properties
            newCanvas.freeDrawingBrush = new PencilBrush(newCanvas);
            newCanvas.freeDrawingBrush.color = 'black';
            newCanvas.freeDrawingBrush.width = 5;

            const deleteArea = new Rect({
                left: 0,
                top: 0,
                width: 100,
                height: height,
                fill: 'rgba(255, 0, 0, 0.3)',
                stroke: 'red',
                strokeWidth: 2,
                selectable: false,
                evented: false,
                hasControls: false,
                hasBorders: false,
                lockMovementX: true,
                lockMovementY: true,
                id: 'deleteArea',
            });
            newCanvas.add(deleteArea);

            const deleteText = new FabricText('Delete', {
                left: 50,
                top: height / 2,
                fontSize: 20,
                fill: 'red',
                textAlign: 'center',
                originX: 'center',
                originY: 'center',
                selectable: false,
                evented: false,
                hasControls: false,
                hasBorders: false,
                lockMovementX: true,
                lockMovementY: true,
                id: 'deleteText',
                
            });
            newCanvas.add(deleteText);

            newCanvas.on('object:modified', (e) => {
                const obj = e.target;
                const deleteRect = newCanvas.getObjects().find(o => o.id === 'deleteArea');
            
                if (obj && deleteRect && obj.intersectsWithObject(deleteRect)) {
                    if(obj.type === "activeselection"){
                        obj.getObjects().forEach(subObj => {
                            // console.log('Removing object:', subObj);
                            // removeObjs(subObj)
                            newCanvas.remove(subObj);
                            newCanvas.renderAll();
                        });
                    }else{
                        newCanvas.remove(obj)
                    }
                }
            });            

            setCanvas(newCanvas);

            return () => {
                // Clean up the canvas instance on component unmount
                newCanvas.dispose();
            };
        }
    }, []);

    const handleDraw = () => {
        if (canvas) {
            // Toggle drawing mode
            const newDrawingMode = !isDrawing;
            canvas.isDrawingMode = newDrawingMode;
            setIsDrawing(newDrawingMode);
        }
    };

    let index = 0

    const addRect = () => {
        if (canvas) {
            const rect = new Rect({
                left: 200+(index*10)<canvasRef.current.width ? 200+(index*10) : (index = 0, 200),
                top: 100+(index*10)<canvasRef.current.height ? 100+(index*10) : (index = 0, 100),
                width: 100,
                height: 100,
                fill: null, // No fill
                stroke: 'black', // Border color
                strokeWidth: 2, // Border width
            });
            canvas.add(rect);
            index+=1
            // console.log(index)
        }
    };

    const addEleToCanvas = (e) => {
        if(canvas){
            let imageEle = document.createElement('img');
            imageEle.src = e;
            imageEle.onload = () => {
                let fabImg = new Image(imageEle)
                fabImg.scaleToWidth(100)
                fabImg.scaleToHeight(100)
                canvas.add(fabImg);
                canvas.centerObject(fabImg);
                canvas.setActiveObject(fabImg);
            }
        }
    };

    return (
        <>
            <div ref={containerRef} className='fabric-canvas' style={{ height: '50vh', width: '100vw' }}>
                <canvas
                    ref={canvasRef}
                    style={{ border: '1px solid #000', display: 'block' }} // Ensure the canvas fills its container
                />
            </div>
            <button type='button' onClick={handleDraw}>
                {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
            </button>
            <button type='button' onClick={addRect}>
                <SquareTwoToneIcon/>
            </button>
            {itemList.map((svg, index) => (
                <button key={index} type='button' onClick={()=>addEleToCanvas(svg.path)}>
                    <img src={svg.path} alt="Single Bed SVG" style={{ width: '100px', height: '100px' }} />
                    {/* {console.log(singleBed)} */}
                    {/* {svg.name} */}
                </button>
            ))}
            <div>
            </div>
        </>
    );
};

export default FabricDemo;
