import { cn } from '@/lib/utils';
import styles from './styles.module.scss';
import { Slot } from '@radix-ui/react-slot';

interface FeatureSectionProps extends React.HTMLAttributes<HTMLElement> {
  hasOrder?: boolean;
  name: string;
  asChild?: boolean;
}

interface FeatureSectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  isNew?: boolean;
}

const FeatureSection = ({ name, className, asChild = false, ...props }: FeatureSectionProps) => {
  const Comp = asChild ? Slot : 'section';

  return <Comp className={cn(styles[name], className)} {...props} />;
};
FeatureSection.displayName = 'FeatureSection';

const FeatureSectionContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        'grid justify-items-center overflow-hidden rounded-lg lg:grid-cols-2 lg:grid-rows-1',
        styles.bgGradient,
        className,
      )}
    />
  );
};
FeatureSectionContent.displayName = 'FeatureSectionContent';

const FeatureSectionImage = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('relative flex items-center justify-center', className)} {...props}>
      {children}
    </div>
  );
};
FeatureSectionImage.displayName = 'FeatureSectionImage';

const FeatureSectionInformation = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex flex-col justify-center gap-2 tablet:gap-4', className)} {...props} />;
};
FeatureSectionInformation.displayName = 'FeatureSectionInformation';

const FeatureSectionTitle = ({ isNew = false, className, children, ...props }: FeatureSectionTitleProps) => {
  return (
    <div {...props}>
      {isNew && (
        <h4 className='mb-2 text-sm font-medium uppercase tracking-widest text-light-500 lg:mb-3'>Nuevo producto</h4>
      )}
      <h2
        className={cn('text-[28px] font-medium leading-[1] tablet:text-[36px] lg:text-5xl lg:leading-[1]', className)}
      >
        {children}
      </h2>
    </div>
  );
};
FeatureSectionTitle.displayName = 'FeatureSectionTitle';

const FeatureSectionDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm leading-[1.5] lg:text-[16px] lg:leading-[1.3]', className)} {...props} />
);
FeatureSectionDescription.displayName = 'FeatureSectionDescription';

const FeatureSectionBottom = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex justify-center', className)} {...props}>
    {children}
  </div>
);
FeatureSectionBottom.displayName = 'FeatureSectionBottom';

export {
  FeatureSection,
  FeatureSectionContent,
  FeatureSectionImage,
  FeatureSectionTitle,
  FeatureSectionInformation,
  FeatureSectionDescription,
  FeatureSectionBottom,
};
