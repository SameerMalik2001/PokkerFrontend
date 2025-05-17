import { cn } from '@/lib/utils'
import React from 'react'

const ShowData = ({ data }: any) => {

  const getCardSize = (len: number) => {
    if (len <= 5) return 'w-[200px] h-[300px]'
    if (len <= 8) return 'w-[170px] h-[260px]'
    if (len <= 12) return 'w-[150px] h-[240px]'
    if (len <= 18) return 'w-[130px] h-[200px] text-7xl'
    return 'w-[110px] h-[200px] text-6xl'
  }

  const cardSizeClass = getCardSize(data?.length || 0)


  return (
    <div className='w-full h-full flex justify-center items-center gap-4 py-4 flex-wrap px-2'>
      {
        data?.map((item: any, index: number) => {
          return <div key={item?.name} className={cn(`p-1 gap-3 text-8xl border-foreground border-[2px] rounded-lg flex justify-center items-center flex-col`, cardSizeClass)}>
            <div className='h-[70%]  w-[95%] flex justify-center items-center rounded-lg bg-foreground text-background 🤔'> 
              <p style={{ rotate: item?.score === '' ? `${(index * 40) % 360}deg`:'0deg' }} className={item?.score === '' ? 'animate-spinSlow' : ''}>{item?.score !== "" ? item?.score : item?.isSelected ? "👍" : "🤔"}</p>
            </div>
            <div className='text-xl capitalize break-all px-2'>
              {item?.username}
            </div>
          </div>
        })
      }
    </div>
  )
}

export default ShowData