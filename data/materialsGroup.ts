import type { MaterialItem } from './materials.generated';
import {
  MATERIALS_ITEMS,
  MATERIAL_CATEGORY_LABELS,
  MATERIAL_CATEGORY_ORDER,
} from './materials.generated';

export interface MaterialsGroup {
  categoryId: string;
  label: string;
  items: MaterialItem[];
}

export function getMaterialsGroups(lang: 'ru' | 'en'): MaterialsGroup[] {
  const by = new Map<string, MaterialItem[]>();
  for (const item of MATERIALS_ITEMS) {
    const list = by.get(item.category) ?? [];
    list.push(item);
    by.set(item.category, list);
  }
  const seen = new Set<string>();
  const order: string[] = [];
  for (const id of MATERIAL_CATEGORY_ORDER) {
    if (by.has(id)) {
      order.push(id);
      seen.add(id);
    }
  }
  for (const id of Array.from(by.keys()).sort()) {
    if (!seen.has(id)) order.push(id);
  }
  return order.map((categoryId) => ({
    categoryId,
    label: MATERIAL_CATEGORY_LABELS[categoryId]?.[lang] ?? categoryId,
    items: by.get(categoryId)!,
  }));
}
