import Image from "next/image";
import useLoggedInUser from "@/hooks/useLoggedInUser";

const images = [
  "/images/default-blue.png",
  "/images/default-red.png",
  "/images/default-slate.png",
  "/images/default-green.png",
];

interface UserCardProps {
  name: string;
  image?: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, image }) => {
  const imgSrc =
    image === "/no-image" ? images[Math.floor(Math.random() * 4)] : image;

  return (
    <div className="group flex-row w-44 mx-auto">
      <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer overflow-hidden">
        <Image
          draggable={false}
          className="w-max h-max object-contain"
          src={imgSrc!}
          alt={`Profile picture of ${name}`}
          width={100}
          height={100}
        />
      </div>
      <div className="mt-4 text-gray-700 dark:text-gray-400 text-2xl text-center group-hover:text-white">
        {name}
      </div>
    </div>
  );
};

const Profiles = () => {
  const { data: loggedInUser } = useLoggedInUser();
  const imagePic = loggedInUser?.image ? loggedInUser?.image : "no-image";
  return (
    <div className="flex items-center h-screen justify-center overflow-x-hidden">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl dark:text-white text-center">
          Who&#39;s watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div className="flex gap-10 mt-2">
            <UserCard name={loggedInUser?.name} image={`/${imagePic}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profiles;
