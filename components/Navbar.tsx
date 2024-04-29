"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { TfiMenu } from "react-icons/tfi";
import autoAnimate from "@formkit/auto-animate";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type NavItem = {
  label: string;
  link?: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    label: "Features",
    link: "#",
    children: [
      { label: "New Tech", link: "#" },
      { label: "METAVERSE", link: "#" },
      { label: "AI ERA", link: "#" },
    ],
  },
  {
    label: "Comapany",
    link: "#",
    children: [
      { label: "SAAS", link: "#" },
      { label: "BLOG", link: "#" },
      { label: "Security", link: "#" },
    ],
  },
  {
    label: "Career",
    link: "#",
  },
  {
    label: "About",
    link: "#",
  },
];

export default function Navbar() {
  const [animationParent] = useAutoAnimate();
  const [isSideMenuOpen, setSideMenue] = useState(false);
  function openSideMenu() {
    setSideMenue(true);
  }
  function closeSideMenu() {
    setSideMenue(false);
  }
  return (
    <div className="mx-auto flex w-full max-w-7xl justify-between px-4 py-5 text-sm">
      <section ref={animationParent} className="flex items-center gap-10">
        <p className="font-bold text-4xl cursor-pointer text-black">META</p>
        {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}
        <div className="hidden md:flex items-center gap-4 transition-all">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.link ?? "#"}
              className=" relative group px-2 py-3 transition-all"
            >
              <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
                <span>{item.label}</span>
                {item.children && (
                  <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0 " />
                )}
              </p>
              {item.children && (
                <div className="absolute right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 shadow-md transition-all group-hover:flex text-black">
                  {item.children.map((data, i) => (
                    <Link
                      key={i}
                      href="/"
                      className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black"
                    >
                      <p className="whitespace-nowrap pl-2">{data.label}</p>
                    </Link>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>
      <section className="hidden md:flex items-center gap-8">
        <button className="h-fit text-neutral-400 transition-all hover:text-black/90">
          Login
        </button>
        <button className="h-fit text-neutral-400 border-2  border-neutral-400 rounded-xl transition-all px-4 py-2 hover:text-black/90">
          Register
        </button>
      </section>
      <TfiMenu
        onClick={openSideMenu}
        className="cursor-pointer text-4xl md:hidden"
      />
    </div>
  );
}

function MobileNav({ closeSideMenu }: { closeSideMenu: () => void }) {
  return (
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden">
      <div className="h-full w-[65%] bg-white px-4 py-4">
        <section className="flex justify-end">
          <AiOutlineClose
            onClick={closeSideMenu}
            className="cursor-pointer text-4xl"
          />
        </section>
        <div className="flex flex-col gap-4 transition-all">
          {navItems.map((item, i) => (
            <SingleNavItem key={i} label={item.label} link={item.link}>
              {item.children}
            </SingleNavItem>
          ))}
        </div>
      </div>
    </div>
  );
}

function SingleNavItem(item: NavItem) {
  const [isItemOpen, setItem] = useState(false);
  const [animationParent] = useAutoAnimate();

  function toggleItem() {
    return setItem(!isItemOpen);
  }

  return (
    <Link
      ref={animationParent}
      onClick={toggleItem}
      href={item.link ?? "#"}
      className=" relative  px-2 py-3 transition-all"
    >
      <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black ">
        <span>{item.label}</span>
        {item.children && (
          <IoIosArrowDown
            className={`transition-all  text-xs  ${isItemOpen && "rotate-180"}`}
          />
        )}
      </p>
      {isItemOpen && item.children && (
        <div className="  w-auto flex-col gap-1 rounded-lg bg-white py-3 transition-all flex  text-black">
          {item.children.map((data, i) => (
            <Link
              key={i}
              href="/"
              className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black"
            >
              <p className="whitespace-nowrap pl-2">{data.label}</p>
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
}
