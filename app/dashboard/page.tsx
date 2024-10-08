"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user?.name || session?.user?.email}</p>
    </div>
  );
}
</boltArtifact>

Now, let's update the main page to include a link to the sign-in page:

<boltArtifact id="update-main-page" title="Update Main Page">
<boltAction type="file" filePath="app/page.tsx">
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">School Management System</h1>
      <Link href="/auth/signin">
        <Button>Sign In</Button>
      </Link>
    </div>
  );
}