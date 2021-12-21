export default ({ app }) => {
  app.$sentry.configureScope(scope => {
    scope.setUser({
      id: app.$strapi.user ? app.$strapi.user.id : "MITAAPRO USER",
      email: app.$strapi.user ? app.$strapi.user.email : undefined
    });
  });
};
