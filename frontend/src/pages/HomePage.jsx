import React from 'react'
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';
import { useChatStore } from '../store/useChatStore';

const HomePage = () => {
   const { selectedUser } = useChatStore();


   return (
      <div className='h-screen bg-base-200'>
         <div className='flex justify-center items-center px-4 pt-20'>
            <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
               <div className='flex overflow-hidden h-full rounded-lg'>
                  <Sidebar />

                  {!selectedUser ? <NoChatSelected /> : <ChatContainer />}

               </div>
            </div>

         </div>

      </div>
   )
}

export default HomePage
