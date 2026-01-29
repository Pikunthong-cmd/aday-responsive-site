export type MenuItem = {
  id: number;
  order: number;
  parent: number;
  title: string;
  url: string;
  nuxtlink?: string;
  children?: MenuItem[];
};

export type MenuResponse = { items: MenuItem[] };

export type DropdownLink = { label: string; href: string };

const sortByOrder = <T extends { order?: number }>(arr: T[]) =>
  [...arr].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const normalize = (s: string) => s.trim().toLowerCase();

const pickHref = (item: MenuItem) => item.nuxtlink || item.url;

const unwrapDuplicateTitleChain = (node: MenuItem): MenuItem => {
  let cur = node;
  while (cur.children?.length === 1) {
    const only = cur.children[0];
    if (normalize(only.title) === normalize(cur.title)) cur = only;
    else break;
  }
  return cur;
};

/** flatten เอาเฉพาะ leaf nodes ใต้หมวด */
const collectLeaf = (nodes: MenuItem[]): MenuItem[] => {
  const out: MenuItem[] = [];
  for (const n of nodes) {
    if (n.children?.length) out.push(...collectLeaf(n.children));
    else out.push(n);
  }
  return out;
};

export const buildMenuModelDynamic = (data: MenuResponse) => {
  const topLevel = sortByOrder((data.items || []).filter((x) => x.parent === 0));

  const dropdowns = topLevel
    .filter((x) => x.children?.length) // มี children => dropdown
    .map((top) => {
      const unwrapped = unwrapDuplicateTitleChain(top);
      const leaf = sortByOrder(collectLeaf(unwrapped.children || []));

      return {
        key: String(top.id), // ใช้ id เป็น key ไม่ fix string
        label: top.title,
        items: leaf.map((c) => ({ label: c.title, href: pickHref(c) })),
      };
    });

  const bottomLinks = topLevel
    .filter((x) => !x.children?.length) // ไม่มี children => ลิงก์ล่าง
    .map((x) => ({ label: x.title, href: pickHref(x) }));

  return { dropdowns, bottomLinks };
};
