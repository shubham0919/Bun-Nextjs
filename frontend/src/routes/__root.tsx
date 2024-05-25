import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: Root,
});

export const routes = {
  HOME: "/",
  ABOUT: "/about",
  EXPENSES: "/expenses",
  CREATE_EXPENSE: "/create-expenses",
};
function NavBar() {
  return (
    <div className="p-2 flex gap-2">
      <Link to={routes.HOME}>Home</Link>
      <Link to={routes.ABOUT}>About</Link>
      <Link to={routes.EXPENSES}>Expenses</Link>
      <Link to={routes.CREATE_EXPENSE}>Create Expense</Link>
    </div>
  );
}

function Root() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
