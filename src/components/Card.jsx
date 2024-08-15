import React, { useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

const Card = ({
  id,
  text,
  position,
  size,
  onDrag,
  onResize,
  onConnect,
  isConnecting,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResize = (event, { size }) => {
    onResize(size);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Draggable
        position={position}
        onStop={(e, data) => onDrag({ x: data.x, y: data.y })}
        bounds="parent"
      >
        <Resizable
          width={size.width}
          height={size.height}
          onResize={handleResize}
          minConstraints={[200, 100]}
          maxConstraints={[400, 300]}
        >
          <div
            className="absolute bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            style={{ width: size.width, height: size.height }}
          >
            <div className="p-4">
              <div className="h-20 overflow-hidden">
                <p className="text-gray-700">{text}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={toggleModal}
                  className="text-blue-500 hover:text-blue-700 font-medium transition duration-300 ease-in-out"
                >
                  Show More
                </button>
                <button
                  onClick={onConnect}
                  className={`${
                    isConnecting
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white px-3 py-1 rounded-full text-sm font-medium transition duration-300 ease-in-out`}
                >
                  {isConnecting ? "Cancel" : "Connect"}
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-300 opacity-50 cursor-se-resize" />
          </div>
        </Resizable>
      </Draggable>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Card Details
            </h2>
            <p className="text-gray-700 mb-6">{text}</p>
            <button
              onClick={toggleModal}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
