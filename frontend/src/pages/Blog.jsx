import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBlog } from "../features/blogs/blogSlice";
import { FaRegHandPointLeft, FaPencilAlt } from "react-icons/fa";
import DOMPurify from "dompurify";

function Blog() {
  const { blog, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.blogs
  );
  const dispatch = useDispatch();
  const { blogid } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getBlog(blogid));
  }, [isError, message, blogid]);

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div className='grid grid-cols-1 place-items-center text-2xl mt-10'>
      <Link to={"/"} className='flex'>
        <FaRegHandPointLeft className='text-violet-900' />
        <p className='ml-4'> Back To Home</p>
      </Link>
      <h1 className='text-4xl font-bold m-5  text-violet-900'>{blog.title}</h1>
      <Link to={`/edit-blog/${blogid}`} className='flex'>
        <FaPencilAlt className='text-red-900' />
        <p className='ml-4 font-bold  text-violet-900 mb-10'> 수정</p>
      </Link>
      <div className='mt-10'>
        <p className='text-base'>작성자 ID: {blog._id}</p>
        <p className='text-base'>
          블로그생성일자: {new Date(blog.createdAt).toLocaleString("ko-KR")}
        </p>
      </div>
      <hr />
    </div>
  );
}

export default Blog;
