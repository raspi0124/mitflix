export default ({ $strapi, app, redirect }) => {
  // Every time the route changes (fired on initialization too)
  app.router.beforeEach((to, from, next) => {
    console.log("BEFOREEACH");
    if (!$strapi.user) {
      if (
        to.path != "/publictop" &&
        to.path != "/" &&
        from.path != "/publictop"
      ) {
        console.log("UNLOGGEDIN FROM PLUGIN");
        console.log(
          to.path != "/publictop" && to.path != "/" && from.path != "/publictop"
        );
        return redirect(301, "/publictop");
      } else {
        return next();
      }
    } else {
      return next();
    }
  });
};
