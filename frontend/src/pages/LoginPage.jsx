import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });
   const { login, isLoggingIn } = useAuthStore();

   const handleSubmit = async (e) => {
      e.preventDefault();
      login(formData);
   };

   return (
      <div className="grid h-screen lg:grid-cols-2">
         {/* Left Side - Form */}
         <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="space-y-8 w-full max-w-md">
               {/* Logo */}
               <div className="mb-8 text-center">
                  <div className="flex flex-col gap-2 items-center group">
                     <div
                        className="flex justify-center items-center w-12 h-12 rounded-xl transition-colors bg-primary/10 group-hover:bg-primary/20"
                     >
                        <MessageSquare className="w-6 h-6 text-primary" />
                     </div>
                     <h1 className="mt-2 text-2xl font-bold">Welcome Back</h1>
                     <p className="text-base-content/60">Sign in to your account</p>
                  </div>
               </div>

               {/* Form */}
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-control">
                     <label className="label">
                        <span className="font-medium label-text">Email</span>
                     </label>
                     <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                           <Mail className="z-10 w-5 h-5 text-primary text-base-content/40" />
                        </div>
                        <input
                           type="email"
                           className={`pl-10 w-full input input-bordered`}
                           placeholder="you@example.com"
                           value={formData.email}
                           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                     </div>
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="font-medium label-text">Password</span>
                     </label>
                     <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                           <Lock className="z-10 w-5 h-5 text-primary text-base-content/40" />
                        </div>
                        <input
                           type={showPassword ? "text" : "password"}
                           className={`pl-10 w-full input input-bordered`}
                           placeholder="••••••••"
                           value={formData.password}
                           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                           type="button"
                           className="flex absolute inset-y-0 right-0 items-center pr-3"
                           onClick={() => setShowPassword(!showPassword)}
                        >
                           {showPassword ? (
                              <EyeOff className="w-5 h-5 text-base-content/40" />
                           ) : (
                              <Eye className="w-5 h-5 text-base-content/40" />
                           )}
                        </button>
                     </div>
                  </div>

                  <button type="submit" className="w-full btn btn-primary" disabled={isLoggingIn}>
                     {isLoggingIn ? (
                        <>
                           <Loader2 className="w-5 h-5 animate-spin" />
                           Loading...
                        </>
                     ) : (
                        "Sign in"
                     )}
                  </button>
               </form>

               <div className="text-center">
                  <p className="text-base-content/60">
                     Don&apos;t have an account?{" "}
                     <Link to="/signup" className="link link-primary">
                        Create account
                     </Link>
                  </p>
               </div>
            </div>
         </div>

         {/* Right Side - Image/Pattern */}
         <AuthImagePattern
            title={"Welcome back!"}
            subtitle={"Sign in to continue your conversations and catch up with your messages."}
         />
      </div>
   );
};
export default LoginPage;