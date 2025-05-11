import { useEffect } from "react";
import { X } from "lucide-react";

const ImageModal = ({ image, onClose }) => {
   // Handle click outside the image to close the modal
   const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
         onClose();
      }
   };

   // Close modal when Escape key is pressed
   useEffect(() => {
      const handleKeyDown = (e) => {
         if (e.key === "Escape") {
            onClose();
         }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, [onClose]);

   return (
      <div
         className="flex fixed inset-0 z-50 justify-center items-center bg-black/70"
         onClick={handleBackdropClick}
      >
         <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
               onClick={onClose}
               className="absolute -top-4 -right-4 p-1 rounded-full bg-base-300"
               aria-label="Close"
            >
               <X size={24} />
            </button>
            <img
               src={image}
               alt="Full size"
               className="max-w-full max-h-[90vh] object-contain"
               crossOrigin="anonymous"
               loading="lazy"
               decoding="async"
            />
         </div>
      </div>
   );
};

export default ImageModal;
