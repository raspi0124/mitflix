export default async ({ store }) => {
  if (!store.state.loggedIn) {
    redirect("/login");
  }
};
