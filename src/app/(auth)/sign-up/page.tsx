import SignUpForm from "@/components/form/SignUpForm";

const page = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="sm:w-[30%] items-center">
        <SignUpForm />
      </div>
    </section>
  );
};

export default page;
