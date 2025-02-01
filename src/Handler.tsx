import { type SetStateAction, type Dispatch } from "react";
import { type Edge, type OnConnect, addEdge } from "@xyflow/react";

interface HandlerProps {
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  setIsResizing: Dispatch<SetStateAction<boolean>>;
  setStaticWidth: Dispatch<SetStateAction<number>>;
  setInputText: Dispatch<SetStateAction<string>>;
  isResizing: boolean;
}

const useHandlers = ({
  setEdges,
  setIsResizing,
  setStaticWidth,
  setInputText,
  isResizing,
}: HandlerProps) => {
  const onConnect: OnConnect = (connection) =>
    setEdges((edges) => addEdge(connection, edges));

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX;
      setStaticWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  return {
    onConnect,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleInputChange,
  };
};

export default useHandlers;
