import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { createContext, ReactNode, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthProviderProps){

  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: '648238717755-6aabn9ufjssm81ma3mf099q2b3a2r7ng.apps.googleusercontent.com',
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
      scopes: ["profile", "email"]
    })
   

  async function signIn(){
    try {
      setIsUserLoading(true)
      await promptAsync();
      
    } catch (error) {
      console.log(error);
      throw error;      
    } finally {
      setIsUserLoading(false)
    }
    
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user:{
        name: "Manoel",
        avatarUrl: "https://github.com/manoellvitor.png"
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}