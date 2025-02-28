export const routes = {
  shop: {
    href: "/shop",
  },
  home: {
    href: "/home",
  },
  outfits: {
    href: "/outfits",
  },
  wishlist: {
    href: "/wishlist",
  },
  profile: {
    href: (userId: string) => `/profile/${userId}`,
  },
};
