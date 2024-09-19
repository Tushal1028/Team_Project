    import React, { useEffect, useRef, useState } from 'react';
    import { Canvas, PencilBrush, Rect, FabricText, Image } from 'fabric';
    import SquareTwoToneIcon from '@mui/icons-material/SquareTwoTone';
    import singleBed from './Images/elements/single-bed.png';

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
                const containerRect = containerRef.current.getBoundingClientRect();
                const width = containerRect.width;
                const height = containerRect.height;

                canvasRef.current.width = width;
                canvasRef.current.height = height;

                const newCanvas = new Canvas(canvasRef.current);

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
                        if (obj.type === "activeselection") {
                            obj.getObjects().forEach(subObj => {
                                newCanvas.remove(subObj);
                                newCanvas.renderAll();
                            });
                        } else {
                            newCanvas.remove(obj);
                        }
                    }
                });

                setCanvas(newCanvas);

                return () => {
                    newCanvas.dispose();
                };
            }
        }, []);

        const handleDraw = () => {
            if (canvas) {
                const newDrawingMode = !isDrawing;
                canvas.isDrawingMode = newDrawingMode;
                setIsDrawing(newDrawingMode);
            }
        };

        let index = 0;

        const addRect = () => {
            if (canvas) {
                const rect = new Rect({
                    left: 200 + (index * 10) < canvasRef.current.width ? 200 + (index * 10) : (index = 0, 200),
                    top: 100 + (index * 10) < canvasRef.current.height ? 100 + (index * 10) : (index = 0, 100),
                    width: 100,
                    height: 100,
                    fill: null,
                    stroke: 'black',
                    strokeWidth: 2,
                });
                canvas.add(rect);
                index += 1;
            }
        };

        const addEleToCanvas = (e) => {
            if (canvas) {
                let imageEle = document.createElement('img');
                imageEle.src = e;
                imageEle.onload = () => {
                    let fabImg = new Image(imageEle);
                    fabImg.scaleToWidth(100);
                    fabImg.scaleToHeight(100);
                    canvas.add(fabImg);
                    canvas.centerObject(fabImg);
                    canvas.setActiveObject(fabImg);
                };
            }
        };

        // Function to handle canvas download
        const downloadCanvas = () => {
            if (canvas) {
                // Temporarily remove deleteArea and deleteText
                const deleteArea = canvas.getObjects().find(o => o.id === 'deleteArea');
                const deleteText = canvas.getObjects().find(o => o.id === 'deleteText');
                
                if (deleteArea) canvas.remove(deleteArea);
                if (deleteText) canvas.remove(deleteText);
        
                // Store the original background color
                const originalBackgroundColor = canvas.backgroundColor;
                // Set the background color to white
                canvas.backgroundColor = 'white';
                canvas.renderAll(); // Re-render to apply the background color
                console.log(JSON.stringify(canvas))
                // Generate data URL with the background color
                const dataURL = canvas.toDataURL({
                    format: 'png',
                    quality: 1.0,
                });
        
                // Reset the background color to the original
                canvas.backgroundColor = originalBackgroundColor;
                canvas.renderAll(); // Re-render to show the original background
        
                // Add deleteArea and deleteText back to the canvas
                if (deleteArea) canvas.add(deleteArea);
                if (deleteText) canvas.add(deleteText);
                canvas.renderAll(); // Re-render to show the objects again
        
                // Download the image
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'canvas.png';
                link.click();
            }
        };
        

        return (
            <>
            {console.log(JSON.stringify(canvas))}
                <div ref={containerRef} className='fabric-canvas' style={{ height: '50vh', width: '100vw' }}>
                    <canvas
                        ref={canvasRef}
                        style={{ border: '1px solid #000', display: 'block' }}
                    />
                </div>
                <button type='button' onClick={handleDraw}>
                    {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
                </button>
                <button type='button' onClick={addRect}>
                    <SquareTwoToneIcon />
                </button>
                {itemList.map((svg, index) => (
                    <button key={index} type='button' onClick={() => addEleToCanvas(svg.path)}>
                        <img src={svg.path} alt={svg.name} style={{ width: '100px', height: '100px' }} />
                    </button>
                ))}
                <button type='button' onClick={downloadCanvas}>
                    Download Canvas
                </button>
            </>
        );
    };

    export default FabricDemo;
