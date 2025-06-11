import React from 'react';
import fredrick from '../assets/fredrick.png';
import lazarus from '../assets/lazarus.png';
import brian from '../assets/brian.png';


const PlayerHeroImage = ({ player }) => {

  const getPlayerImage = () => {
    const firstName = player.user.firstName.toLowerCase();
    
    switch (firstName) {
      case 'fredrick':
        return fredrick;
      case 'brian':
        return brian;
      case 'lazarus':
        return lazarus;
      default:
        return convertGoogleDriveUrl(player.imageUrl);
    }
};

  const imageUrl = getPlayerImage();

  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt={`${player.user.firstName} ${player.user.lastName}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default PlayerHeroImage;