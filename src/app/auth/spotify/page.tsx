'use client'

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react";

const AuthComponent = () =>  {
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

export default function AuthPage() {
  return <Suspense><AuthComponent /></Suspense>
}
