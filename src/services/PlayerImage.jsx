import React, { useState } from "react";
import { User, Loader2 } from "lucide-react";
import { calculateAge } from "../utils/getTotalStats";
import fredrick from '../assets/fredrick.png';
import lazarus from '../assets/lazarus.png';
import brian from '../assets/brian.png';

// Function to convert Google Drive URLs to direct image URLs
const convertGoogleDriveUrl = (url) => {
  if (!url) return null;
  
  // Handle different Google Drive URL formats
  let fileId = null;
  
  // Format 1: https://drive.google.com/uc?id=FILE_ID
  const ucRegex = /drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/;
  const ucMatch = url.match(ucRegex);
  
  if (ucMatch && ucMatch[1]) {
    fileId = ucMatch[1];
  } else {
    // Format 2: https://drive.google.com/file/d/FILE_ID/view
    const fileRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const fileMatch = url.match(fileRegex);
    
    if (fileMatch && fileMatch[1]) {
      fileId = fileMatch[1];
    } else {
      // Format 3: Any other format with id parameter
      const idRegex = /[?&]id=([a-zA-Z0-9_-]+)/;
      const idMatch = url.match(idRegex);
      
      if (idMatch && idMatch[1]) {
        fileId = idMatch[1];
      }
    }
  }
  
  if (fileId) {
    // Convert to the thumbnail URL format which works better for images
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`;
  }
  
  // If it's not a Google Drive URL, return as is
  return url;
};

const PlayerImage = ({ player }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  // Map local images for specific players
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
    <div className="relative h-100 overflow-hidden bg-slate-700">
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      )}
      
      {!imageError && imageUrl ? (
        <img
          src={imageUrl}
          alt={`${player.user.firstName} ${player.user.lastName}`}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoading(false)}
          onError={(e) => {
            console.error('Image failed to load:', imageUrl);
            setImageError(true);
            setImageLoading(false);
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-700">
          <div className="text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-2" />
            <div className="text-gray-300 font-medium">
              {player.user.firstName} {player.user.lastName}
            </div>
            {imageError && (
              <div className="text-red-400 text-sm mt-1">Image failed to load</div>
            )}
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      
      {/* Player Name Overlay */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-3">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-1">
            {player.user.firstName} {player.user.lastName}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-cyan-300 text-lg font-medium">
              {player.kplRecords[0]?.position || 'Goalkeeper'}
            </p>
            <p className="text-gray-300 text-base">
              {calculateAge(player.user.dateOfBirth)} years old
            </p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-green-400 font-bold text-lg">{player.internationalCaps}</span>
            <span className="text-gray-300 text-sm ml-1">caps</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerImage;