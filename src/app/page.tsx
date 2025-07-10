// src/app/page.tsx
'use client'
import { useEffect, useState } from "react";
import Products from "@/components/products-page";
import { useAuthStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user, accessToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we have user data but no access token (unlikely but possible)
    if (user && !accessToken) {
      useAuthStore.getState().clearUser();
    }
    
    // Only redirect if we're done loading and there's no user
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, accessToken, isLoading, router]);

  useEffect(() => {
    // Set loading to false after initial check
    setIsLoading(false);
  }, []);

  if (isLoading || !user) return null;

  return <Products />;
}