import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { FaSignInAlt } from 'react-icons/fa';
import Spinner from '../components/Spinner';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // Redirect when logged in
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
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='px-8 py-6 mt-4 text-left bg-indigo-500 shadow-lg'>
        <div className='flex justify-center'>
          <h3 className='text-2xl font-bold text-white text-center'>
            <p className='flex'>
              <FaSignInAlt size='1.5em' /> 당신 계정으로 로그인
            </p>
          </h3>
        </div>
        <form onSubmit={onSubmit}>
          <div className='mt-4'>
            <div>
              <label className='block text-white text-2xl' htmlFor='email'>
                Email
              </label>

              <input
                type='email'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-xl'
                id='email'
                name='email'
                value={email}
                onChange={onChange}
                placeholder='Enter your email'
                required
              />
            </div>
            <div className='mt-4'>
              <label className='block text-white text-2xl' htmlFor='password'>
                password
              </label>
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
            <div className='flex items-baseline justify-between'>
              <button>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
