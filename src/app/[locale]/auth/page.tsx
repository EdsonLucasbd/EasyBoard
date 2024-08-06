import React from 'react'
import meela from '../../../../public/login/Meela-Pantalones.svg'
import waiting from '../../../../public/login/Waiting.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Login() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-brand-50'>
      <Image 
        src={meela} 
        alt='' 
        aria-hidden 
        width={452} 
        height={452} 
        className='hidden absolute lg:block size-[400px] left-20 bottom-28'
      />
      <div className='flex flex-col items-center justify-center lg:w-[539px] 
        lg:h-[600px] bg-white rounded-[40px] drop-shadow-[0px_4px_10px_rgba(0,0,0,0.15)] px-11'
      >
        <div className="flex items-start justify-between w-full">
          <div className='flex flex-col'>
            <p className='font-normal font-sans text-sm'>Bem vindo ao Cactus Kanban</p>
            <h1 className='text-[55px] font-medium font-sans'>Entrar</h1>
          </div>

          <div className="flex flex-col font-normal font-sans text-sm">
            <p>Não tem uma conta?</p>
            <Link href='/auth/signup' className='text-brand-500 w-fit'>Inscrever-se</Link>
          </div>
        </div>

        
      </div>
      <Image 
        src={waiting} 
        alt='' 
        aria-hidden 
        width={439} 
        height={439} 
        className='hidden absolute lg:block size-[350px] right-20 bottom-20'
      />
    </div>
  )
}
