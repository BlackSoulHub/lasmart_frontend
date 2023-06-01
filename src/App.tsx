import { useState, useEffect } from "react";
import { Stage, Layer, Text, Circle, Group } from "react-konva";
import { IDotDto } from "./Models/DotModels";
import DotService from "./Services/DotService";
import { KonvaEventObject } from "konva/lib/Node";
import { Html } from "react-konva-utils";

function App() {

  const [dots, setDots] = useState<IDotDto[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  function dispalayDots() {
    DotService.getAll()
    .then(dots => {
      if (dots === null) {
        return setError("Произошла неизвестная ошибка")
      }

      if (dots.length === 0) {
        setDots([])
        return setError("Точки отсутствуют")
      }

      setDots(dots)
      console.log(dots)
    })
  }

  useEffect(dispalayDots, [])

  function handlerDragEnd(event: KonvaEventObject<DragEvent>) {
    const updatedPointId = Number.parseInt(event.target.id())
    if (Number.isNaN(updatedPointId)) {
      return setError("Неожиданная ошибка, перезагрузите страницу")
    }

    const foundedDot = dots?.find(dot => dot.id === updatedPointId)
    if (foundedDot === undefined) {
      return setError("Неожиданная ошибка, перезагрузите страницу")
    }

    DotService.update({...foundedDot, x: event.target.x(), y: event.target.y()})
    dispalayDots()
  }

  function doubleClickHandler(event: KonvaEventObject<MouseEvent>) {
    const updatedPointId = Number.parseInt(event.target.id())
    if (Number.isNaN(updatedPointId)) {
      return setError("Неожиданная ошибка")
    }

    DotService.delete(updatedPointId)
      .then(err => {
        setError(err)
        dispalayDots()
      })
  }

  if (dots === null) {
    return (
      <div className="App">
        <div>Подождите, идёт загрузка!</div>
        {
          error && (
            <div>
              Ошибка: {error}
            </div>
          )
        }
      </div>
    )
  }

  return (
    <div className="App">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Тестовое задание"/>
          {
            dots.map(dot => (
              <Group 
              key={dot.id} 
              id={dot.id.toString()} 
              x={dot.x} 
              y={dot.y}
              draggable={true}
              onDragEnd={handlerDragEnd}
              onDblClick={doubleClickHandler}
              >
                <Circle
                  radius={dot.radius}
                  fill={dot.color}
                  id={dot.id.toString()}
                  onDblClick={doubleClickHandler}
                />
                <Group offsetY={-30}>
                  <Html>
                    {
                      dot.comments.map((comment) => (
                        <div 
                        style={{backgroundColor: comment.backgroundColor, marginTop: "10px", border: "1px solid black", padding: "5px"}}>
                          {comment.text}
                        </div>
                    ))
                    }
                  </Html>
                </Group>
                
              </Group>
            ))
          }
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
