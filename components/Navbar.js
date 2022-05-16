import Image from "next/image";
import logo from "../img/MementoLogo.svg";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="logo">
          <Link href="/">
            <a>
              <Image src={logo}></Image>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
