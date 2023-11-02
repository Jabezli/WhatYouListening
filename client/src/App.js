import logo from "./logo.svg";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };
    // this is a new approach to not DRY on error handling. With it, we can take out the try-catch block
    // then, when we excute the function, in here, fetchData(), we will use the catchErrors to wrap it which will take care with the errors.
    catchErrors(fetchData());
  }, []);

  console.log(profile);
  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a className="App-link" href="http://localhost:8888/login">
            Login to Spotify
          </a>
        ) : (
          <>
            <h1>Logged in!</h1>
            <button onClick={logout}>Log Out</button>
            {profile && (
              <div>
                <h1>{profile.display_name}</h1>
                <p>{profile.followers.total} Followers</p>
                {profile.images.length && profile.images[0].url && (
                  <img src={profile.images[0].url} alt="Avatar" />
                )}
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
