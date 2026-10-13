import { Badge } from '@/components/ui/Badge/badge';
import { badgeConfig, BadgeType } from '@/features/products/data/badgeConfig';

interface ProductTagsProps {
  tags?: BadgeType[];
}

export function ProductTags({ tags }: ProductTagsProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {tags?.map((tag) => {
        const config = badgeConfig[tag];

        if (!config) return null;

        return (
          <Badge key={tag} variant={config.variant} title={config.description}>
            <span>{config.label}</span>
          </Badge>
        );
      })}
    </div>
  );
}
