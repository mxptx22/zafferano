import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="text-red-500">Hello Y'all</div>
      <button className="btn btn-accent">Hello</button>
    </div>
  );
};

export default Home;
