import { useState } from "react";

interface DraftProps {
  staticWidth: number;
  inputText: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function Draft({ staticWidth, inputText, handleInputChange }: DraftProps) {
  const [selectionInfo, setSelectionInfo] = useState<{
    text: string;
    buttonPosition: { top: number; left: number } | null;
  }>({ text: "", buttonPosition: null });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bulletPoints, setBulletPoints] = useState<string[]>([
    "Point 1",
    "Point 2",
    "Point 3",
  ]);
  const [promptText, setPromptText] = useState("");

  const handleSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setSelectionInfo({ text: "", buttonPosition: null });
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();
    const rect = range.getBoundingClientRect();

    if (selectedText) {
      setSelectionInfo({
        text: selectedText,
        buttonPosition: {
          top: rect.bottom,
          left: rect.right,
        },
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptText.trim()) {
      setBulletPoints([...bulletPoints, promptText.trim()]);
      setPromptText(""); // Clear the input after submission
    }
  };

  const handleDeletePoint = (indexToDelete: number) => {
    setBulletPoints(bulletPoints.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="static-ui" style={{ width: staticWidth }}>
      <h1>Static UI</h1>
      <div className="content">
        <div className="textarea-wrapper">
          <textarea
            value={inputText}
            onChange={handleInputChange}
            onMouseUp={handleSelection}
            onKeyUp={handleSelection}
            placeholder="Type something here..."
            className="input-textbox"
          />
          {selectionInfo.buttonPosition && (
            <button
              className="selection-button"
              style={{
                position: "fixed",
                top: `${selectionInfo.buttonPosition.top}px`,
                left: `${selectionInfo.buttonPosition.left}px`,
              }}
            >
              +
            </button>
          )}
        </div>
        <div className="bottom-box">
          <div className="box-container">
            <div className="box-a">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="image-input"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
              ) : (
                <div className="image-placeholder">Upload an image</div>
              )}
            </div>
            <div className="box-b">
              <div className="bullet-points">
                <ul>
                  {bulletPoints.map((point, index) => (
                    <li key={index} className="bullet-point-item">
                      <span>{point}</span>
                      <button
                        className="delete-button"
                        onClick={() => handleDeletePoint(index)}
                        aria-label="Delete point"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <form onSubmit={handlePromptSubmit} className="prompt-form">
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Add a new point..."
                  className="prompt-input"
                />
                <button type="submit" className="prompt-submit">
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Draft;
