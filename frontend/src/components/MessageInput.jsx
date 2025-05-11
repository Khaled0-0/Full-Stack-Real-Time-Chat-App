import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = ({ messagesContainerRef }) => {
   const [text, setText] = useState("");
   const [imagePreview, setImagePreview] = useState(null);
   const fileInputRef = useRef(null);
   const { sendMessage } = useChatStore();

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
         toast.error("Please select an image file");
         return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
         setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
   };

   const removeImage = () => {
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
   };

   const handleSendMessage = async (e) => {
      e.preventDefault();
      if (!text.trim() && !imagePreview) return;

      try {
         // Scroll to bottom immediately when sending a message
         if (messagesContainerRef?.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
         }

         await sendMessage({
            text: text.trim(),
            image: imagePreview,
         });

         // Clear form
         setText("");
         setImagePreview(null);
         if (fileInputRef.current) fileInputRef.current.value = "";

         // Ensure scroll to bottom after state updates
         setTimeout(() => {
            if (messagesContainerRef?.current) {
               messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
         }, 100);
      } catch (error) {
         console.error("Failed to send message:", error);
      }
   };

   return (
      <div className="p-4 w-full">
         {imagePreview && (
            <div className="flex gap-2 items-center mb-3">
               <div className="relative">
                  <img
                     src={imagePreview}
                     alt="Preview"
                     className="object-cover w-20 h-20 rounded-lg border border-zinc-700"
                     crossOrigin="anonymous"
                     decoding="async"
                  />
                  <button
                     onClick={removeImage}
                     className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                     flex items-center justify-center"
                     type="button"
                  >
                     <X className="size-3" />
                  </button>
               </div>
            </div>
         )}

         <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
            <div className="flex flex-1 gap-2">
               <input
                  type="text"
                  className="w-full rounded-lg input input-bordered input-sm sm:input-md"
                  placeholder="Type a message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
               />
               <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
               />

               <button
                  type="button"
                  className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                  onClick={() => fileInputRef.current?.click()}
               >
                  <Image size={20} />
               </button>
            </div>
            <button
               type="submit"
               className="btn btn-sm btn-circle"
               disabled={!text.trim() && !imagePreview}
            >
               <Send size={22} />
            </button>
         </form>
      </div>
   );
};
export default MessageInput;