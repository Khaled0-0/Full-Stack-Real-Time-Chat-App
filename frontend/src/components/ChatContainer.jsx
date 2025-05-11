import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import ImageModal from "./ImageModal";

const ChatContainer = () => {
   const {
      messages,
      getMessages,
      isMessagesLoading,
      selectedUser,
      subscribeToMessages,
      unsubscribeFromMessages,
   } = useChatStore();
   const { authUser } = useAuthStore();
   const messageEndRef = useRef(null);
   const messagesContainerRef = useRef(null);
   const [selectedImage, setSelectedImage] = useState(null);
   useEffect(() => {
      getMessages(selectedUser._id);

      subscribeToMessages();

      return () => unsubscribeFromMessages();
   }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

   useEffect(() => {
      if (messagesContainerRef.current && messages) {
         messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
   }, [messages]);

   // Handle scrolling when images load
   const scrollToBottom = () => {
      if (messagesContainerRef.current) {
         messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
   };



   if (isMessagesLoading) {
      return (
         <div className="flex overflow-auto flex-col flex-1">
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput messagesContainerRef={messagesContainerRef} />
         </div>
      );
   }

   return (
      <div className="flex overflow-auto flex-col flex-1">
         <ChatHeader />

         <div ref={messagesContainerRef} className="overflow-y-auto flex-1 p-4 space-y-4">
            {messages.length === 0 && (
               <div className="py-4 text-center text-zinc-500">No messages yet</div>
            )}
            {messages.map((message) => (
               <div
                  key={message._id}
                  className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
               >
                  <div className="chat-image avatar">
                     <div className="rounded-full border size-10">
                        <img
                           src={
                              message.senderId === authUser._id
                                 ? authUser.profilePic || "/avatar.png"
                                 : selectedUser.profilePic || "/avatar.png"
                           }
                           alt="profile pic"
                        />
                     </div>
                  </div>
                  <div className="mb-1 chat-header">
                     <time className="ml-1 text-xs opacity-50">
                        {formatMessageTime(message.createdAt)}
                     </time>
                  </div>
                  <div className="flex flex-col chat-bubble">
                     {message.image && (
                        <div className="relative">
                           <img
                              src={message.image}
                              alt="Attachment"
                              className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer"
                              onClick={() => setSelectedImage(message.image)}
                              onLoad={scrollToBottom}
                              crossOrigin="anonymous"
                              decoding="async"
                           />
                        </div>
                     )}
                     {message.text && <p>{message.text}</p>}
                  </div>
               </div>
            ))}
            <div ref={messageEndRef} />
         </div>

         <MessageInput messagesContainerRef={messagesContainerRef} />

         {selectedImage && (
            <ImageModal
               image={selectedImage}
               onClose={() => setSelectedImage(null)}
            />
         )}
      </div>
   );
};
export default ChatContainer;