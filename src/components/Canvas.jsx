import React, { useState, useRef } from "react";
import Card from "./Card";
import { Xwrapper, Xarrow } from "react-xarrows";

const Canvas = () => {
  const [cards, setCards] = useState([
    {
      id: "1",
      text: "This is a long text that will be truncated. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      position: { x: 50, y: 50 },
      size: { width: 250, height: 150 },
    },
    {
      id: "2",
      text: "Another card with different content. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      position: { x: 350, y: 100 },
      size: { width: 250, height: 150 },
    },
  ]);
  const [arrows, setArrows] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingStart, setConnectingStart] = useState(null);
  const canvasRef = useRef(null);

  const handleDrag = (id, position) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, position } : card))
    );
  };

  const handleResize = (id, size) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, size } : card)));
  };

  const handleConnect = (id) => {
    if (isConnecting) {
      if (connectingStart && connectingStart !== id) {
        setArrows([...arrows, { start: connectingStart, end: id }]);
        setIsConnecting(false);
        setConnectingStart(null);
      }
    } else {
      setIsConnecting(true);
      setConnectingStart(id);
    }
  };

  const handleAddCard = () => {
    const newId = (cards.length + 1).toString();
    setCards([
      ...cards,
      {
        id: newId,
        text: `New card ${newId} with some text. This is a placeholder for longer content that can be added to demonstrate the truncation and expansion features of the card.`,
        position: { x: 50, y: 50 },
        size: { width: 250, height: 150 },
      },
    ]);
  };

  return (
    <div
      className="relative w-full h-[700px] overflow-auto border-2 border-gray-300 bg-white rounded-lg shadow-lg"
      ref={canvasRef}
    >
      <button
        onClick={handleAddCard}
        className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Add Card
      </button>
      <Xwrapper>
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            onDrag={(position) => handleDrag(card.id, position)}
            onResize={(size) => handleResize(card.id, size)}
            onConnect={() => handleConnect(card.id)}
            isConnecting={isConnecting}
          />
        ))}
        {arrows.map((arrow, index) => (
          <Xarrow
            key={index}
            start={arrow.start}
            end={arrow.end}
            color="#3B82F6"
            strokeWidth={2}
            headSize={6}
            curveness={0.3}
          />
        ))}
      </Xwrapper>
    </div>
  );
};

export default Canvas;
