export default function VerifyRequest() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Check your email</h2>
        <p className="text-gray-600">
          A sign in link has been sent to your email address. Please check your inbox and click on the link to verify your email.
        </p>
      </div>
    </div>
  );
}