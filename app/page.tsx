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