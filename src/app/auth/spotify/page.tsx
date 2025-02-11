'use client'

import { useSearchParams } from "next/navigation"
import { useEffect } from "react";

export default function AuthLayout() {
  const p = useSearchParams();
  useEffect(() => {
    const saveCode = async () => {
      const code = p.get('code');
      if(!code) return;
      await fetch('/api/spotify/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({code})
      });
    
    }
    saveCode();
  }, [p]);

  return <></>
}