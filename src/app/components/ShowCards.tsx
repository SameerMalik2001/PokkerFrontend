'use client'
import { useSocket } from '@/context/Socket.context'
import React, { useEffect, useState } from 'react'

const ShowCards = ({roomId}:any) => {
  const valueOfCard = ["0", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89", "?"]
  const [selectedCard, setSelectedCard] = useState("")

  const socket = useSocket()

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit('message', selectedCard);
  }, [selectedCard])

  return (
    <div className='w-full h-full flex justify-center items-center gap-4 py-4 flex-wrap px-2'>
      {
        valueOfCard?.map((item: any) => {
          return <div key={item} onClick={() => setSelectedCard(item)} className={`${selectedCard === item ? 'border-green-500 bg-foreground text-background' : 'border-foreground'} border-[2px] border-dashed cursor-pointer rounded-md h-[130px] w-[80px] text-6xl flex justify-center items-center  `}>
            <p>{item}</p>
          </div>
        })
      }
    </div>
  )
}

export default ShowCards