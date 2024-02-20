import auth from './firebase';
import { signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut, 
    UserCredential} from 'firebase/auth';
import IUser, { INewUser, IUserWithUUID } from '../../interfaces/IUser';

const _apiUrl = "/api/userprofile";

// Get All
export const getUsersList = () => {
  return getToken().then((token: string) => {
      return fetch(_apiUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer  ${token}`,
        },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
          throw new Error(
                "An unexpected error occurred",
          );
        }
    });
  });
}

// Gets the two usertypes, 1 for admin and 2 for 'author' (regular user)
export const getAllUserTypes = () => {
  return getToken().then((token: string) => {
      return fetch(`${_apiUrl}/usertype`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer  ${token}`,
        },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
          throw new Error(
                "An unexpected error occurred",
          );
        }
    });
  });
}

// checks to see if user exists in Firebase 
const _doesUserExist = (firebaseUserId: string) => {
  return getToken().then((token: string) =>
    fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.ok));
};

const _saveUser = async (userProfile: IUserWithUUID): Promise<void> => {
  return getToken().then((token: string) =>
    fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userProfile)
    }).then(resp => resp.json()));
};


//  creates the token that gets passed to the server when sending requests
export const getToken = () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("Cannot get current user. Did you forget to login?");
  }
  return currentUser.getIdToken();
};

export const login = (email: string, pw: string) => {
  return signInWithEmailAndPassword(auth, email, pw)
    .then((signInResponse) => _doesUserExist(signInResponse.user.uid))
    .then((doesUserExist) => {
      if (!doesUserExist) {

        // If we couldn't find the user in our app's database, we should logout of firebase
        logout();

        throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
      } else {
        _onLoginStatusChangedHandler(true);
      }
    }).catch(err => {
      console.error(err);
      throw err;
    });
};

export const logout = () => {
  signOut(auth);
};

export const register = async (userProfile: INewUser, password: string): Promise<IUserWithUUID> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, userProfile.email, password);
    const firebaseUUID: string = userCredential.user.uid;
    const completeUserData: IUserWithUUID = { ...userProfile, firebaseUUID };
    await _saveUser(completeUserData);
    _onLoginStatusChangedHandler(true);
    return completeUserData;
  } catch (error) {
    console.error("Error with user registration:", error);
    throw error;
  }
};


// gets the current user's info from server.
// this gets called in App.js and passed as a prop through the components as 'userProfile'
export const me = () => {
  return getToken().then((token) =>
  fetch(`${_apiUrl}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((resp) => resp.json()),
  );
};

// GET single user info from server
export const getUserById = (id: number) => {
  return getToken().then(token => {
    return fetch(`${_apiUrl}/details/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
  })
}

// PUT UserProfile
export const editUserInfo = (user: IUser) => {
  return getToken().then((token) => {
      return fetch(`${_apiUrl}/${user.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((resp) => {
        if (!resp.ok) {
          throw new Error("An unknown error occurred while trying to edit user information.")
        }
      })
  })
}

export const deleteUser = (id: number) => {
  return getToken().then(token => {
      return fetch(`${_apiUrl}/${id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`
          }
        })
      })
    }
    
// GET by firebase
export const getUserDetails = (firebaseUUID: string) => {
  return getToken().then(token => {
    return fetch(`${_apiUrl}/${firebaseUUID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
  })
}

// This function will be overwritten when the react app calls `onLoginStatusChange`
let _onLoginStatusChangedHandler: (isLoggedIn: boolean) => void = () => {
  throw new Error("There's no login status change handler. Did you forget to call 'onLoginStatusChange()'?")
};

// This function acts as a link between this module.
// It sets up the mechanism for notifying the react app when the user logs in or out.

export const onLoginStatusChange = (onLoginStatusChangedHandler: (isLoggedIn: boolean) => void) => {

  // Here we take advantage of the firebase 'onAuthStateChanged' observer in a couple of different ways.
  // 
  // The first callback, 'initialLoadLoginCheck', will run once as the app is starting up and connecting to firebase.
  //   This will allow us to determine whether the user is already logged in (or not) as the app loads.
  //   It only runs once because we immediately cancel it upon first run.
  //
  // The second callback, 'logoutCheck', is only concerned with detecting logouts.
  //   This will cover both explicit logouts (the user clicks the logout button) and session expirations.
  //   The responsibility for notifying the react app about login events is handled in the 'login' and 'register'
  //   functions located elsewhere in this module. We must handle login separately because we have to do a check
  //   against the app's web API in addition to authenticating with firebase to verify a user can login.
  const unsubscribeFromInitialLoginCheck =
    onAuthStateChanged(auth, function initialLoadLoginCheck(user) {
      unsubscribeFromInitialLoginCheck();
      onLoginStatusChangedHandler(!!user);

      onAuthStateChanged(auth, function logoutCheck(user) {
        if (!user) {
          onLoginStatusChangedHandler(false);
        }
      });
    });

  // Save the callback so we can call it in the `login` and `register` functions.
  _onLoginStatusChangedHandler = onLoginStatusChangedHandler;
};