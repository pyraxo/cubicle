
import './Login.css';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from 'firebase/database';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const firebaseConfig = {
  databaseURL: "https://cubicle-b4654-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);







function Login() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleSignIn = async () => {

    const snapshot = await get(ref(database, `USERS/${username}`));
    const fetchedData = snapshot.val();


    if (fetchedData.password.toString() == password) {
      console.log("Equals")
      navigate('/charcreate', { state: { username } });
      
    }


  };
  

  return (
    <div className="Login">
      <h1>Cubicle!</h1>
      <div>
      <div>




                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button onClick={handleSignIn}>Sign In</button>
                </div>
              </div>



      </div>
    </div>
  );
}

export default Login;