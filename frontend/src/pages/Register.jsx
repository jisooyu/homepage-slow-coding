import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when registered
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='px-8 py-6 mt-4 text-left bg-white shadow-lg'>
        <div className='flex justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-20 h-20 text-blue-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path d='M12 14l9-5-9-5-9 5 9 5z' />
            <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
            />
          </svg>
        </div>
        <h3 className='flex text-2xl text-center'>
          slow-coding 신규회원 등록을 해주세요
        </h3>

        <section className='block'>
          <form onSubmit={onSubmit}>
            <div className='mt-4'>
              <input
                type='text'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                id='name'
                name='name'
                value={name}
                onChange={onChange}
                placeholder='Enter your name'
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                id='email'
                name='email'
                value={email}
                onChange={onChange}
                placeholder='Enter your email'
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                id='password'
                name='password'
                value={password}
                onChange={onChange}
                placeholder='Enter password'
                required
              />
            </div>
            <div className='mt-4'>
              <input
                type='password'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                id='password2'
                name='password2'
                value={password2}
                onChange={onChange}
                placeholder='Confirm password'
                required
              />
            </div>
            <button>Submit</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Register;
