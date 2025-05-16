'use client'
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
const [userInfo,setUserInfo]= useState({
  username:'',
});
axios.get('/api/user').then(res => {
  console.log(res)
}) 

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     {userInfo.username}
    </div>
  );
}
