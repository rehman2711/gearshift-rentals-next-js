import Sidebar from "./sidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <Sidebar>
        {children}
      </Sidebar>
    </>
  );
}
