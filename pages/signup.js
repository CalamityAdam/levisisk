import { useState } from 'react';
import { useAuth } from '../services/firebase';

export const SignUp = () => {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === 'userEmail') setEmail(value);
    else if (name === 'userPassword') setPassword(value);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    auth.signUp(email, password);
  }

  return (
    <div>
      <h1>Hello from SignUp</h1>
      <form>
        <label htmlFor='userEmail'>Email</label>
        <input
          type='email'
          name='userEmail'
          value={email}
          id='userEmail'
          onChange={handleChange}
        />
        <label htmlFor='userPassword'>Password</label>
        <input
          type='password'
          name='userPassword'
          value={password}
          id='userPassword'
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
