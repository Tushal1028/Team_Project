import React, { useState } from 'react';
import './Styles/Edit.css';
import { useNavigate } from 'react-router-dom';
function Edit() {
  const navigate=useNavigate()
  function close(){
    navigate('/home')
  }
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [droppedImages, setDroppedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    'https://via.placeholder.com/80x80.png?text=Image1',
    'https://via.placeholder.com/80x80.png?text=Image2',
    'https://via.placeholder.com/80x80.png?text=Image3',
    'https://via.placeholder.com/80x80.png?text=Image4',
    'https://via.placeholder.com/80x80.png?text=Image5',
    'https://via.placeholder.com/80x80.png?text=Image6',
    'https://via.placeholder.com/80x80.png?text=Image7',
    'https://via.placeholder.com/80x80.png?text=Image8',
    'https://via.placeholder.com/80x80.png?text=Image9',
    'https://via.placeholder.com/80x80.png?text=Image10',
    'https://via.placeholder.com/80x80.png?text=Image11',
    'https://via.placeholder.com/80x80.png?text=Image12',
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChatInputChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      setChatMessages([...chatMessages, currentMessage]);
      setCurrentMessage('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDragStart = (e, image) => {
    e.dataTransfer.setData('text/plain', image);
    setSelectedImage(null); // Deselect any image when dragging starts
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const image = e.dataTransfer.getData('text/plain');
    const dropContainer = e.target.closest('.content-display-edit');
    const rect = dropContainer.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDroppedImages([...droppedImages, { id: Date.now(), image, x, y }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setDroppedImages([]);
  };

  const handleDeleteImage = (id) => {
    setDroppedImages(droppedImages.filter((img) => img.id !== id));
  };

  const handleImageDrag = (e, id) => {
    e.preventDefault();
    const dropContainer = e.target.closest('.content-display-edit');
    const rect = dropContainer.getBoundingClientRect();

    const newX = e.clientX - rect.left - e.target.offsetWidth / 2;
    const newY = e.clientY - rect.top - e.target.offsetHeight / 2;

    setDroppedImages(
      droppedImages.map((img) =>
        img.id === id ? { ...img, x: newX, y: newY } : img
      )
    );
  };

  const handleImageClick = (id) => {
    setSelectedImage(id);
  };

  const filteredImages = images.filter((image, index) =>
    `Image${index + 1}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`app-container-edit ${isSidebarOpen ? '' : 'sidebar-closed-edit'}`}>
      <div className={`sidebar-edit ${isSidebarOpen ? '' : 'sidebar-hidden-edit'}`}>
        <div className="sidebar-header-edit">
          <span className="logo-edit">InterioVirt</span>
          <input
            type="text"
            placeholder="Search"
            className="search-box-edit"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="sidebar-content-edit">
          {filteredImages.map((image, index) => (
            <div key={index} className="sidebar-row-edit">
              <div
                className="sidebar-item-edit"
                draggable
                onDragStart={(e) => handleDragStart(e, image)}
              >
                <img src={image} alt={`Sidebar Item ${index + 1}`} />
              </div>
              <div
                className="sidebar-item-edit"
                draggable
                onDragStart={(e) => handleDragStart(e, image)}
              >
                <img src={image} alt={`Sidebar Item ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle Button besides the Sidebar */}
      <div className="sidebar-toggle-container-edit">
        <button className="sidebar-toggle-edit" onClick={toggleSidebar}>
          {isSidebarOpen ? '<' : '>'}
        </button>
      </div>

      <div className="main-content-edit">
        <div className="top-bar-edit">
          <div className="spacer-edit"></div>
          <div className="top-buttons-edit">
            <button className="top-button-edit" onClick={handleClear}>
              Clear
            </button>
            <button className="top-button-edit">Download</button>
            <button className="top-button save-button-edit">SAVE</button>
            <button className="top-button close-button-edit" onClick={close}>Close</button>
          </div>
        </div>
        <div
          className="content-display-edit"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {droppedImages.map((img) => (
            <div
              key={img.id}
              className="dropped-image-container"
              style={{ left: img.x, top: img.y }}
              onMouseDown={() => handleImageClick(img.id)}
              draggable
              onDragEnd={(e) => handleImageDrag(e, img.id)}
            >
              <img
                src={img.image}
                alt="Dropped"
                style={{
                  border: selectedImage === img.id ? '2px solid red' : 'none',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                }}
              />
              <button
                className="delete-image-btn"
                onClick={() => handleDeleteImage(img.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className="chat-box-edit">
          <div className="chat-header-edit">Chat</div>
          <div className="chat-content-edit">
            {chatMessages.map((message, index) => (
              <div key={index} className="chat-message-edit">
                {message}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="chat-input-container-edit">
            <input
              type="text"
              className="chat-input-edit"
              placeholder="Type a message..."
              value={currentMessage}
              onChange={handleChatInputChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
