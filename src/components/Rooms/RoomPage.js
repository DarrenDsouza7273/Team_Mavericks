import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCog } from "@fortawesome/free-solid-svg-icons";
import './RoomPage.css';

const RoomsPage = () => {
  const [cards, setCards] = useState([]);

  const addCard = () => {
    setCards([...cards, { 
      id: cards.length, 
      fields: [],
      settings: {
        gloves: false,
        helmet: false,
        boots: false
      },
      showSettings: false
    }]);
  };

  const addField = (cardId) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, fields: [...card.fields, ""] } : card
    ));
  };

  const updateField = (cardId, fieldIndex, value) => {
    setCards(cards.map(card => 
      card.id === cardId ? {
        ...card,
        fields: card.fields.map((field, index) => 
          index === fieldIndex ? value : field
        )
      } : card
    ));
  };

  const toggleSettings = (cardId) => {
    setCards(cards.map(card =>
      card.id === cardId ? { ...card, showSettings: !card.showSettings } : card
    ));
  };

  const toggleSetting = (cardId, setting) => {
    setCards(cards.map(card =>
      card.id === cardId ? {
        ...card,
        settings: {
          ...card.settings,
          [setting]: !card.settings[setting]
        }
      } : card
    ));
  };

  return (
    <div className="rooms-page">
      <button className="add-card-button" onClick={addCard}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <div className="cards-container">
        {cards.map((card) => (
          <div key={card.id} className="room-card">
            <p>Room Card {card.id + 1}</p>
            <div className="room-card-content">
              {card.fields.map((field, index) => (
                <input
                  key={index}
                  type="text"
                  value={field}
                  onChange={(e) => updateField(card.id, index, e.target.value)}
                  placeholder={`Field ${index + 1}`}
                />
              ))}
            </div>
            <div className="room-card-actions">
              <button onClick={() => addField(card.id)}>
                <FontAwesomeIcon icon={faPlus} /> Add Field
              </button>
              <button onClick={() => toggleSettings(card.id)}>
                <FontAwesomeIcon icon={faCog} /> Settings
              </button>
            </div>
            {card.showSettings && (
              <div className="room-card-settings">
                <label>
                  <input
                    type="checkbox"
                    checked={card.settings.gloves}
                    onChange={() => toggleSetting(card.id, 'gloves')}
                  /> Gloves
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={card.settings.helmet}
                    onChange={() => toggleSetting(card.id, 'helmet')}
                  /> Helmet
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={card.settings.boots}
                    onChange={() => toggleSetting(card.id, 'boots')}
                  /> Boots
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;