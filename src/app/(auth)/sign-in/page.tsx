import SignInForm from "@/components/form/SignInForm";

const page = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="sm:w-[30%] items-center">
        <SignInForm />
      </div>
    </section>
  );
};

export default page;
