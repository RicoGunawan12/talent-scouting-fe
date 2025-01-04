import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { useMsal } from "@azure/msal-react";
import { capitalizeName } from "../util/Utility.tsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { decrypt } from "../util/Utility.tsx";
import { useAuth } from "../context/AuthContext.tsx";

function ProfileHeader() {
  const [name, setName] = useState(decrypt(Cookies.get("name")));
  const { instance, accounts } = useMsal();
  const nav = useNavigate();
  const { logout } = useAuth();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
    };
    updateCurrentTime();

    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = async () => {
    Cookies.remove("token");
    if (decrypt(Cookies.get("is_microsoft")) == "true") {
      Cookies.remove("name");
      Cookies.remove("email");
      Cookies.remove("token");
      Cookies.remove("is_microsoft");
      Cookies.remove("student");
      Cookies.remove("id");
      Cookies.remove("nim");
      Cookies.remove("gpa");
      logout();
      await instance.logoutRedirect({
        account: accounts[0],
        postLogoutRedirectUri: import.meta.env.VITE_REDIRECT_URI,
      });
    }
    Cookies.remove("name");
    Cookies.remove("email");
    Cookies.remove("token");
    Cookies.remove("is_microsoft");
    logout();

    nav("/");
  };

  const formattedDate = currentTime.toLocaleString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const secondCommaIndex = formattedDate.indexOf(
    ",",
    formattedDate.indexOf(",") + 1
  );

  const formattedDateWithoutSecondComma =
    formattedDate.slice(0, secondCommaIndex) +
    formattedDate.slice(secondCommaIndex + 1);

  return (
    <div className="flex">
      <div className="mr-6 ">
        <div>
          <p className="font-bold">{formattedDateWithoutSecondComma}</p>
        </div>
        <div>
          <p className="text-end text-lg">{formattedTime}</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="font-semibold border-2 border-black pl-4 pr-2 py-1 rounded-md flex items-center">
            <div>{name ? capitalizeName(name) : ""}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="angle-down"
              className="w-8"
            >
              <path
                fill="#000000"
                d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"
              ></path>
            </svg>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              to={
                "/student-profile/" +
                decrypt(Cookies.get("id") || "0")
              }
            >
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="text-[red] font-semibold" onClick={handleLogout}>
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProfileHeader;
