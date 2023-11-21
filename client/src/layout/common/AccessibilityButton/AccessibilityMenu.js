import React, { useState } from "react";
import "../../../css/AccessibilityMenu.css";

const AccessibilityMenu = ({
  style,
  onToggleDarkMode,
  onToggleTextOnly,
  onToggleAnimations,
  onToggleLinkHighlight,
}) => {
  const [fontSize, setFontSize] = useState(16);

  const fontFamilies = [
    { name: "Arial", text: " מעבר לפונט אריאל" },
    { name: "Times New Roman", text: "מעבר לפונט טיימס ניו רומן" },
    { name: "Verdana", text: "מעבר לפונט ורדנה " },
  ];

  const [isSimpleText, setSimpleText] = useState(false);
  const [showDescriptions, setShowDescriptions] = useState(false);

  const toggleDescriptions = () => {
    const images = document.querySelectorAll("img");
    if (showDescriptions) {
      images.forEach((img) => {
        img.removeAttribute("aria-describedby");
      });
    } else {
      images.forEach((img) => {
        const id = img.getAttribute("data-description-id");
        if (id) {
          img.setAttribute("aria-describedby", id);
        }
      });
    }
    setShowDescriptions(!showDescriptions);
  };

  const toggleSimpleText = () => {
    const contentElement = document.getElementById("content");
    if (isSimpleText) {
      contentElement.innerHTML = "זהו טקסט רגיל ומורכב.";
    } else {
      contentElement.innerHTML = "טקסט פשוט.";
    }
    setSimpleText(!isSimpleText);
  };

  const increaseLineSpacing = () => {
    const bodyStyles = getComputedStyle(document.body);
    const currentFontSize = parseFloat(bodyStyles.fontSize);
    const currentLineSpacing =
      parseFloat(bodyStyles.lineHeight) / currentFontSize;
    const newLineSpacing = currentLineSpacing + 0.2;
    document.body.style.lineHeight = `${newLineSpacing}`;
  };

  const decreaseLineSpacing = () => {
    const bodyStyles = getComputedStyle(document.body);
    const currentFontSize = parseFloat(bodyStyles.fontSize);
    const currentLineSpacing =
      parseFloat(bodyStyles.lineHeight) / currentFontSize;
    const newLineSpacing = currentLineSpacing - 0.2;
    document.body.style.lineHeight = `${newLineSpacing}`;
  };

  const increaseTextSize = () => {
    setFontSize((prevFontSize) => {
      const newFontSize = prevFontSize + 2;
      document.documentElement.style.fontSize = `${newFontSize}px`;
      console.log("New Font Size:", newFontSize);
      return newFontSize;
    });
  };

  const decreaseTextSize = () => {
    setFontSize((prevFontSize) => {
      const newFontSize = prevFontSize - 2;
      document.documentElement.style.fontSize = `${newFontSize}px`;
      console.log("New Font Size:", newFontSize);
      return newFontSize;
    });
  };

  const skipToMainContent = () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.tabIndex = -1;
    }
  };

  const changeFontFamily = (fontFamily) => {
    document.body.style.fontFamily = fontFamily;
  };

  const changeTextColor = (color) => {
    document.body.style.color = color;
  };

  const toggleAnimations = () => {
    document.body.classList.toggle("animation-active");
  };

  const toggleHeaderHighlight = () => {
    const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headers.forEach((header) => {
      header.classList.toggle("highlighted-header");
    });
  };

  const zoomElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.toggle("zoomed-element");
    }
  };

  const speakText = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const handleSpeakClick = () => {
    const textToSpeak = document.querySelector("#content").innerText;
    speakText(textToSpeak);
  };

  const changeAnimationSpeed = (speed) => {
    document.documentElement.style.setProperty(
      "--animation-speed",
      `${speed}s`
    );
  };

  return (
    <div className="accessibility-menu" style={style}>
      <button onClick={increaseTextSize}>הגדל טקסט</button>
      <button onClick={decreaseTextSize}>הקטן טקסט</button>
      <button onClick={onToggleDarkMode}>מצב לילה</button>
      <button onClick={onToggleTextOnly}>מצב טקסט בלבד</button>
      <button onClick={skipToMainContent}>דלג לתוכן העיקרי</button>
      <button onClick={() => changeTextColor("black")}>טקסט שחור</button>
      <button onClick={() => changeTextColor("blue")}>טקסט כחול</button>
      <button onClick={() => changeTextColor("red")}>טקסט אדום</button>
      <button onClick={onToggleAnimations}>הפעל/כבה אנימציות</button>
      <button onClick={onToggleLinkHighlight}>הדגש קישורים</button>
      <button onClick={toggleHeaderHighlight}>סמן כותרות</button>
      <button onClick={() => zoomElement("#elementToZoom")}>זום לאלמנט</button>
      <button onClick={handleSpeakClick}>הקראת מסך</button>
      <button onClick={toggleSimpleText}>החלף לטקסט פשוט</button>
      <button onClick={toggleDescriptions}>הפעל/כבה תיאורים</button>
      <button onClick={() => changeAnimationSpeed(2)}>האט אנימציה</button>
      <button onClick={() => changeAnimationSpeed(0.5)}>האץ אנימציה</button>

      <div className="font-family-buttons">
        {fontFamilies.map((fontFamily) => (
          <button
            key={fontFamily.name}
            onClick={() => changeFontFamily(fontFamily.name)}
          >
            {fontFamily.text}
          </button>
        ))}
      </div>
      <button onClick={increaseLineSpacing}>הגדל רווח בין שורות</button>
      <button onClick={decreaseLineSpacing}>הקטן רווח בין שורות</button>
    </div>
  );
};

export default AccessibilityMenu;
