import auth from './firebase';
import { signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut, 
    UserCredential} from 'firebase/auth';
import IUser from '../../interfaces/IUser';

const _apiUrl = "/api/userprofile";

//  creates the token that gets passed to the server when sending requests
export const getToken = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("Cannot get current user. Did you forget to login?");
  }
  return currentUser.getIdToken();
};

// Get All
export const getUsersList = async () => {
  try {
    const token = await getToken();
    const response = await fetch(_apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("An unexpected error occurred");
    }
  } catch (error) {
    throw new Error(`Error occurred while get user list: ${error}`);
  }
}

// Gets the two usertypes, 1 for admin and 2 for 'author' (regular user)
export const getAllUserTypes = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/usertype`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("An unexpected error occurred");
    }
  } catch (error) {
    throw new Error(`Error occurred while get user types: ${error}`);
  }
}

const _saveUser = async (userProfile: IUser): Promise<void> => {
  try {
    const token = await getToken();
    const response = await fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userProfile)
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while saving user");
    }
  } catch (error) {
    throw new Error(`Error occurred while saving user: ${error}`);
  }
};

export const login = async (email: string, pw: string,
  setUserProfile: React.Dispatch<React.SetStateAction<IUser | null>>) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pw);
    const userAuth = userCredential.user;

    const userDetails = await getUserDetails(userAuth.uid);

    const userProfile: IUser = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      userTypeId: userDetails.usertypeId,
      firebaseUUID: userAuth.uid
    }
    setUserProfile(userProfile);

  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const logout = () => {
  signOut(auth);
};

export const register = async (userProfile: IUser, password: string): Promise<IUser> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, userProfile.email, password);
    const firebaseUUID: string = userCredential.user.uid;
    const completeUserData: IUser = { ...userProfile, firebaseUUID };
    await _saveUser(completeUserData);
    return completeUserData;
  } catch (error) {
    console.error("Error with user registration:", error);
    throw error;
  }
};

// GET single user info from server
export const getUserById = async (id: number) => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/details/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("An unexpected error occurred while fetching user details");
    }
  } catch (error) {
    throw new Error(`Error occurred while getting user: ${error}`);
  }
};

// PUT UserProfile
export const editUserInfo = async (user: IUser) => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while trying to edit user information");
    }
  } catch (error) {
    throw new Error(`Error occurred while editing user info: ${error}`);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("An unknown error occurred while attempting to delete user");
    }
  } catch (error) {
    throw new Error(`Error occurred while deleting user: ${error}`);
  }
};

// GET by firebase
export const getUserDetails = async (firebaseUUID: string) => {
  try {
    const token = await getToken();
    const response = await fetch(`${_apiUrl}/${firebaseUUID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("An unexpected error occurred while fetching user details");
    }
  } catch (error) {
    throw new Error(`Error occurred while getting user details: ${error}`);
  }
};