import { Users } from "lucide-react";

const SidebarSkeleton = () => {
   // Create 8 skeleton items
   const skeletonContacts = Array(8).fill(null);

   return (
      <aside
         className="flex flex-col w-20 h-full border-r transition-all duration-200 lg:w-72 border-base-300"
      >
         {/* Header */}
         <div className="p-5 w-full border-b border-base-300">
            <div className="flex gap-2 items-center">
               <Users className="w-6 h-6" />
               <span className="hidden font-medium lg:block">Contacts</span>
            </div>
         </div>

         {/* Skeleton Contacts */}
         <div className="overflow-y-auto py-3 w-full">
            {skeletonContacts.map((_, idx) => (
               <div key={idx} className="flex gap-3 items-center p-3 w-full">
                  {/* Avatar skeleton */}
                  <div className="relative mx-auto lg:mx-0">
                     <div className="rounded-full skeleton size-12" />
                  </div>

                  {/* User info skeleton - only visible on larger screens */}
                  <div className="hidden flex-1 min-w-0 text-left lg:block">
                     <div className="mb-2 w-32 h-4 skeleton" />
                     <div className="w-16 h-3 skeleton" />
                  </div>
               </div>
            ))}
         </div>
      </aside>
   );
};

export default SidebarSkeleton;