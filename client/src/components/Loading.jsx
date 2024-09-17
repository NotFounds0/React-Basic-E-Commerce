import { PulseLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <PulseLoader color="#00a3ff" size={23}/>
    </div>
  );
};

export default Loading;
