import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegHandPointLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs, reset } from "../features/blogs/blogSlice";
import Spinner from "../components/Spinner";
import BlogItem from "../components/BlogItem";

function Blogs() {
  const { blogs, isLoading, isSuccess } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='grid grid-cols-1 place-items-center text-2xl mt-10'>
      <Link to={"/"} className='flex'>
        <FaRegHandPointLeft className='text-violet-900' />
        <p className='ml-4'> Back To Home</p>
      </Link>
      <h1 className='text-4xl font-bold m-5  text-violet-900'>블로그 리스트</h1>
      <div className='bg-slate-200'>
        <div className='grid grid-cols-8'>
          <div className='col-span-3 mx-10 my-3 font-bold  border-solid text-violet-900'>
            상세보기
          </div>
          <div className='col-span-2 mx-10 my-3 font-bold  text-violet-900'>
            카테고리
          </div>
          <div className='col-span-1 mx-10 my-3 font-bold  text-violet-900'>
            상태
          </div>
          <div className='col-span-2 mx-10 my-3 font-bold   text-violet-900'>
            일자
          </div>
        </div>
        {blogs.map((blog) => (
          <BlogItem key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default Blogs;
