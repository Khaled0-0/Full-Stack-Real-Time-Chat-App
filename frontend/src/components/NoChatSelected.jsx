import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
   return (
      <div className="flex flex-col flex-1 justify-center items-center p-16 w-full bg-base-100/50">
         <div className="space-y-6 max-w-md text-center">
            {/* Icon Display */}
            <div className="flex gap-4 justify-center mb-4">
               <div className="relative">
                  <div
                     className="flex justify-center items-center w-16 h-16 rounded-2xl animate-bounce bg-primary/10"
                  >
                     <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
               </div>
            </div>

            {/* Welcome Text */}
            <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
            <p className="text-base-content/60">
               Select a conversation from the sidebar to start chatting
            </p>
         </div>
      </div>
   );
};

export default NoChatSelected;