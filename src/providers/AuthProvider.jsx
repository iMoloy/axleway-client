"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "@/lib/firebase";
import { syncAuthCookie } from "@/lib/authApi";
import { apiFetch } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => !!auth);

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncAuthCookie(currentUser);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logOut = async () => {
    if (auth) {
      await signOut(auth);
    }

    await apiFetch("/auth/logout", { method: "POST" }).catch(() => null);
    toast.success("Logged out successfully");
  };

  const updateUserProfile = async (displayName, photoURL) => {
    if (auth?.currentUser) {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      setUser({ ...auth.currentUser, displayName, photoURL });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
