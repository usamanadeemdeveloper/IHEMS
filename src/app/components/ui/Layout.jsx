import { SignedIn, UserButton } from "@clerk/nextjs";
import DrawerComponent from "../drawer";

function Layout() {
  return (
    <div className="border-b shadow-lg">
      <DrawerComponent />

      {/* Top-right Auth Buttons */}
      <div className="absolute top-4 right-4 z-50">
        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
export default Layout;
