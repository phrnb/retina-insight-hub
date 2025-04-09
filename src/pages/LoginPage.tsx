
import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-100 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-medical-500 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">RetinaScan InsightHub</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">AI-powered retinal diagnostic platform</p>
        </div>
        <AuthForm />
        <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          Secure medical diagnostic system • HIPAA Compliant • 2FA Protected
        </p>
      </div>
    </div>
  );
}
