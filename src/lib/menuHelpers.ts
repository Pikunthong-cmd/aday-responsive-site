
export type MenuItem = {
  id: number;
  order?: number;
  parent: number;
  title: string;
  url?: string;
  nuxtlink?: string;
  description?: string;
  important?: boolean;
  banner_image?: string | false;
  children?: MenuItem[];
};

export type MenuResponse = {
  items: MenuItem[];
};

export function sortByOrder<T extends { order?: number }>(arr: T[]) {
  return [...arr].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function flattenMenu(items: MenuItem[]): MenuItem[] {
  const out: MenuItem[] = [];
  const walk = (nodes: MenuItem[]) => {
    for (const n of nodes) {
      out.push(n);
      if (n.children && n.children.length) walk(n.children);
    }
  };
  walk(items);
  return out;
}

export function findById(id: number, items: MenuItem[]): MenuItem | null {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children?.length) {
      const found = findById(id, item.children);
      if (found) return found;
    }
  }
  return null;
}

export function findRootCategoryTitle(item: MenuItem, tree: MenuItem[]): string {
  let current: MenuItem | null = item;
  let safety = 0;

  while (current && current.parent !== 0 && safety < 50) {
    current = findById(current.parent, tree);
    safety++;
  }

  return current?.title ?? "";
}
