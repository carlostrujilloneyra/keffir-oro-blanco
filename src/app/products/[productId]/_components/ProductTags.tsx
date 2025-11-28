import { Badge } from '@/components/ui/Badge/badge';
import { badgeConfig, BadgeType } from '@/features/products/data/badgeConfig';

interface ProductTagsProps {
  isNew?: boolean;
  tags?: BadgeType[];
}

export function ProductTags({ isNew, tags }: ProductTagsProps) {
  if (!isNew && (!tags || tags.length === 0)) {
    return null;
  }

  return (
    <div className='mb-5 flex flex-wrap gap-2 tablet:mb-6'>
      {isNew && <Badge variant='default'>Nuevo</Badge>}
      {tags?.map((tag) => {
        const config = badgeConfig[tag];

        if (!config) return null;

        return (
          <Badge className='px-3 py-1 tablet:px-4' key={tag} variant={config.variant} title={config.description}>
            <span>{config.label}</span>
          </Badge>
        );
      })}
    </div>
  );
}
