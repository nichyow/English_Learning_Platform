import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ArrowLeft } from "lucide-react";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-2 mb-6 cursor-pointer hover:text-blue-500 transition-colors text-black">
              <ArrowLeft size={24} />
              <Link href="/">Back</Link>
            </div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back,{" "}
                  <span className="text-blue-600">
                    {session?.user.username}
                  </span>
                </h1>
              </div>
              <UserNav />
            </div>

            <div className="border-t border-gray-200 pt-6">
              {/* Add more profile content here */}
              <div className="grid grid-cols-1">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h2 className="text-lg font-semibold text-black mb-4 underline">
                    Profile Information
                  </h2>
                  <p className="text-black">
                    <span className="font-bold">Email</span>:{" "}
                    {session?.user.email}
                  </p>
                  {/* Add profile information here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="flex items-center gap-2 mb-6 cursor-pointer hover:text-blue-500 transition-colors text-black">
            <ArrowLeft size={24} />
            <Link href="/">Back</Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Access Restricted
          </h1>
          <p className="text-gray-600 mb-8">Please sign in to view this page</p>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
