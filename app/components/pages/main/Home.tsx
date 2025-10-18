import Link from "next/link";
import { InversedInfiniteAutoScrollTechStackIcons } from "../../features/InfiniteAutoScrollTechStackIcons";
import RadialCircularBluredBlock from "../../features/RadialCircularBluredBlock";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col gap-8 pt-8">
      <RadialCircularBluredBlock position={{ top: -50, left: -50 }} />
      <RadialCircularBluredBlock position={{ bottom: -50, right: -50 }} />
      <div
        className="min-h-[70vh] flex items-center justify-between max-md:flex-col-reverse gap-8"
      >
        <div className="flex-1 flex flex-col gap-4 max-md:text-center">
          <h1 className="text-6xl max-md:text-4xl font-bold uppercase gradient-heading bg-clip-text text-transparent inline">
            Youssif Salama
          </h1>
          <h2 className="text-4xl font-bold mt-20 ">HI 👋</h2>
          <p>
            Building seamless web experiences with the power of MongoDB,
            Express, React, and Node.js.
          </p>
          <p className="text-xs opacity-75">
            I’m a passionate MERN stack developer specializing in creating
            dynamic, responsive, and scalable web applications. From designing
            intuitive user interfaces with React to developing robust backends
            using Node.js and Express, I deliver end-to-end solutions that drive
            business growth. Skilled in managing databases with MongoDB, I
            ensure your data is secure and accessible. Let’s build modern web
            apps that users love.
          </p>
          <Link
            href="#contact"
            className="bg-gradient-heading md:w-fit py-2 px-6 rounded-md shadow-inner shadow-main-purple"
          >
            Contact Me
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-end">
  <div className="relative shadow-md shadow-main-purple rounded-full overflow-hidden">
    <div
      className="gradient-border rounded-full shadow-inner shadow-main-blue 
                 w-[400px] h-[400px] 
                 max-md:w-[300px] max-md:h-[300px] 
                 max-sm:w-[250px] max-sm:h-[250px] 
                 overflow-hidden"
    >
      <img
        src="/youssif.jpeg"
        alt="Youssif Salama"
        className="rounded-full object-top object-cover w-[400px] h-[400px] 
                   max-md:w-[300px] max-md:h-[300px] 
                   max-sm:w-[250px] max-sm:h-[250px] 
                   shadow-md shadow-main-blue"
      />
    </div>
  </div>
</div>

      </div>
      <div className="mt-auto min-h-[25vh] flex items-center justify-center max-lg:overflow-hidden">
        <InversedInfiniteAutoScrollTechStackIcons />
      </div>
    </main>
  );
};

export default Home;
