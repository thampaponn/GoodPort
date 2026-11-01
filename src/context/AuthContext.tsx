import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchUser, signInRequest } from "../api/users";
import { JwtUser, User } from "../types/models";

const TOKEN_KEY = "token";

type TokenPayload = { sub: JwtUser; exp: number };

type AuthContextValue = {
  user: User | null;
  restoring: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const loadUserFromToken = async (token: string) => {
  const { sub, exp } = jwtDecode<TokenPayload>(token);
  if (exp * 1000 < Date.now()) {
    throw new Error("Session expired");
  }
  return fetchUser(sub._id);
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (token) {
          setUser(await loadUserFromToken(token));
        }
      } catch {
        await AsyncStorage.removeItem(TOKEN_KEY);
      } finally {
        setRestoring(false);
      }
    };
    restoreSession();
  }, []);

  const signIn = useCallback(async (username: string, password: string) => {
    const token = await signInRequest(username, password);
    const signedInUser = await loadUserFromToken(token);
    await AsyncStorage.setItem(TOKEN_KEY, token);
    setUser(signedInUser);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      setUser(await loadUserFromToken(token));
    }
  }, []);

  const value = useMemo(
    () => ({ user, restoring, signIn, signOut, refreshUser }),
    [user, restoring, signIn, signOut, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

// For screens behind the sign-in gate, where a user is guaranteed.
export const useCurrentUser = () => {
  const { user } = useAuth();
  if (!user) {
    throw new Error("useCurrentUser requires a signed-in user");
  }
  return user;
};
