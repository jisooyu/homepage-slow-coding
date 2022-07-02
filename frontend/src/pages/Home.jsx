import React from 'react';
import { Link } from 'react-router-dom';
import { IoCreateOutline, IoReaderOutline } from 'react-icons/io5';

function Home() {
  const buttonStyling =
    'flex space-x-3 mr-2 font-semibold bg-indigo-500 text-gray-100 rounded-sm ring-2 ring-blue-200 px-6 py-2 hover:bg-blue-400  hover:text-white hover:ring-slate-300 mx-8';
  return (
    <>
      <section className='text-center pt-10 text-2xl text-violet-900'>
        <h1>어떤 작업이 필요하신가요?</h1>
        <p>다음 중 하나를 선택해 주세요</p>
      </section>

      <Link to='/new-blog'>
        <div className='grid grid-cols-1 place-items-center text-2xl pt-10'>
          <button className={buttonStyling}>
            <p> 블로그 생성</p>
            <IoCreateOutline />
          </button>
        </div>
      </Link>

      <Link to='/blogs'>
        <div className='grid grid-cols-1 place-items-center text-2xl pt-10'>
          <button className={buttonStyling}>
            <p> 블로그 보기</p>
            <IoReaderOutline />
          </button>
        </div>
      </Link>
    </>
  );
}

export default Home;
