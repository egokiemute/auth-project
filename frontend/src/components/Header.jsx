import React from 'react'

const Header = () => {
  return (
    <div className='container flex items-center justify-between py-4'>
        <div className='flex items-center gap-6'>
            <img src="/logo.svg" alt="TabOS" />
            <div className='flex items-center gap-2'>
                <img src="/search-icon.svg" alt="TabOS Search Icon" width={16} height={16} />
                <p className='text-sm font-medium text-[#000000A3]'>Search</p>
            </div>
        </div>
        <div className='flex items-center gap-6'>
            <ul className='flex items-center gap-4 text-[#000000A3] font-bold text-sm'>
                <li><a href="#">Find a space</a></li>
                <li><a href="#">List your space</a></li>
            </ul>
            <div className='space-x-4'>
                <button>Log in</button>
                <button>Sign up</button>
            </div>
        </div>
    </div>
  )
}

export default Header