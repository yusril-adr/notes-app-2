import React, {
  useState,
  createContext,
  useMemo,
  useContext,
} from 'react';
import PropTypes from 'prop-types';

// Services
import AuthService from '../api/auth';
import TokenService from '../localStorage/TokenService';

const defaultValue = {
  accessToken: null,
  user: null,
  state: 'init',
};

export const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(defaultValue);

  const register = async (payload) => {
    await AuthService.register(payload);
  };

  const getUserLogged = async () => {
    try {
      const { data } = await AuthService.getUserLogged();
      setAuthData((prev) => ({
        ...prev,
        user: data,
        state: 'idle',
      }));
    } catch (error) {
      setAuthData((prev) => ({
        ...prev,
        state: 'idle',
      }));
    }
  };

  const login = async (payload) => {
    try {
      setAuthData((prev) => ({
        ...prev,
        state: 'loading',
      }));
      const { data: { accessToken } } = await AuthService.login(payload);
      TokenService.saveToken(accessToken);
      setAuthData((prev) => ({
        ...prev,
        accessToken,
        state: 'idle',
      }));
      await getUserLogged();
    } catch (error) {
      setAuthData((prev) => ({
        ...prev,
        state: 'idle',
      }));
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setAuthData({
      ...defaultValue,
      state: 'idle',
    });
  };

  const providerValue = useMemo(() => ({
    authData,
    setAuthData,
    register,
    login,
    getUserLogged,
    logout,
  }), [authData]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth should be used in a AuthProvider!');
  return context;
};
