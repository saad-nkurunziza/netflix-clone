import React, { useCallback, useEffect, useState } from "react";
import PlayButton from "@/components/PlayButton";
import FavoriteButton from "@/components/FavoriteButton";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }
  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              poster="/images/logo.png"
              autoPlay
              muted
              loop
              src="/images/logo.png"
              className="w-full brightness-[60%] object-cover h-full"
            />
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <XMarkIcon className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                Lift
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId="6e8a8071f9e3" />
                <FavoriteButton movieId="frdfbdsd" />
              </div>
            </div>
          </div>

          <div className="px-12 py-8">
            <div className="flex flex-row items-center gap-2 mb-8">
              <p className="text-green-400 font-semibold text-lg">New</p>
              <p className="text-white text-lg">120min</p>
              <p className="text-white text-lg">Romance</p>
            </div>
            <p className="text-white text-lg">
              primitive position bright plenty loose bring my history refer
              birds combine least growth exact recent likely daily sense
              gradually castle could exchange secret picture
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
