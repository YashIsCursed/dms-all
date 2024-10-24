import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";


export const Navbar = () => {
  const DropdownContent = () => (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="antialiased transition-all ease-in-out capitalize duration-150 font-medium text-black  shadow-lg"
          color="warning"
          variant="shadow"
        >
          Posts
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown Variants"
        color="success"
        variant="faded"
      >
        <DropdownItem key="copy">All Posts</DropdownItem>
        <DropdownItem key="new">New Post</DropdownItem>
        <DropdownItem key="edit">Edit Post</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete Post
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )

  return (
    <NextUINavbar isBordered>
      <NavbarContent>
        <Button>Home</Button>
        <DropdownContent />

      </NavbarContent>
    </NextUINavbar>
  );
};
