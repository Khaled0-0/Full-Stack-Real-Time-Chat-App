import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
   const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
   const { onlineUsers = [] } = useAuthStore(); // Default to empty array
   const [showOnlineOnly, setShowOnlineOnly] = useState(false);

   useEffect(() => {
      getUsers();
   }, [getUsers]);

   const filteredUsers = showOnlineOnly
      ? users.filter((user) => onlineUsers.includes(user._id))
      : users;

   if (isUsersLoading) return <SidebarSkeleton />;

   return (
      <aside className="flex flex-col w-20 h-full border-r transition-all duration-200 lg:w-72 border-base-300">
         <div className="p-5 w-full border-b border-base-300">
            <div className="flex gap-2 items-center">
               <Users className="size-6" />
               <span className="hidden font-medium lg:block">Contacts</span>
            </div>

            {/* Online filter toggle */}
            <div className="hidden gap-2 items-center mt-3 lg:flex">
               <label className="flex gap-2 items-center cursor-pointer">
                  <input
                     type="checkbox"
                     checked={showOnlineOnly}
                     onChange={(e) => setShowOnlineOnly(e.target.checked)}
                     className="checkbox checkbox-sm"
                  />
                  <span className="text-sm">Show online only</span>
               </label>
               <span className="text-xs text-zinc-500">({Math.max(onlineUsers.length - 1, 0)} online)</span>
            </div>
         </div>

         <div className="overflow-y-auto py-3 w-full">
            {filteredUsers.map((user) => (
               <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full p-3 flex items-center gap-3
                  hover:bg-base-300 transition-colors
                  ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                  `}
               >
                  <div className="relative mx-auto lg:mx-0">
                     <img
                        src={user.profilePic || "/avatar.png"}
                        alt={user.name}
                        className="object-cover rounded-full size-12"
                        crossOrigin="anonymous"
                        loading="lazy"
                        decoding="async"
                     />
                     {onlineUsers.includes(user._id) && (
                        <span className="absolute right-0 bottom-0 bg-green-500 rounded-full ring-2 size-3 ring-zinc-900" />
                     )}
                  </div>

                  <div className="hidden min-w-0 text-left lg:block">
                     <div className="font-medium truncate">{user.fullName}</div>
                     <div className="text-sm text-zinc-400">
                        {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                     </div>
                  </div>
               </button>
            ))}

            {filteredUsers.length === 0 && (
               <div className="py-4 text-center text-zinc-500">No online users</div>
            )}
         </div>
      </aside>
   );
};

export default Sidebar;
