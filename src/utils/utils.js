const slugify = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove invalid characters
      .replace(/\s+/g, '-')       // Replace spaces with dashes
      .replace(/-+/g, '-');       // Collapse consecutive dashes
};

export { slugify };