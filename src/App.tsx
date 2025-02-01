import { useState, useEffect } from "react";
import { useEdgesState } from "@xyflow/react";
import { initialEdges } from "./edges";
import useHandlers from "./Handler";
import Flow from "./Flow";
import Draft from "./Draft";

function App() {
  const defaultWidth = window.innerWidth * (2 / 3);

  const [edges, setEdges] = useEdgesState(initialEdges);
  const [staticWidth, setStaticWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setStaticWidth(defaultWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    onConnect,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleInputChange,
  } = useHandlers({
    setEdges,
    setIsResizing,
    setStaticWidth,
    setInputText,
    isResizing,
  });

  return (
    <div
      className="app-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Draft
        staticWidth={staticWidth}
        inputText={inputText}
        handleInputChange={handleInputChange}
      />
      <div className="resize-handle" onMouseDown={handleMouseDown} />
      <Flow onConnect={onConnect} />
    </div>
  );
}
export default App;
