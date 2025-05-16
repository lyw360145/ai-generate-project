'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
const [userInfo,setUserInfo]= useState({
  username:'',
});
useEffect(() => {
  axios.get('/api/user').then(res => {
    console.log(res.data)
    setUserInfo(res.data.userInfo) // res.data is the user objec
  }) 
}, [])


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     {userInfo.username}
    </div>
  );
}
