import { cn } from '@/lib/utils';
import styles from './styles.module.scss';
import { Slot } from '@radix-ui/react-slot';

type FeatureSectionName =
  | 'lacteos-section'
  | 'manteca-section'
  | 'kefir-chocolate'
  | 'vinage-de-manzana'
  | 'sal-de-maras'
  | 'mermelada-quito-quito'
  | 'category';

interface FeatureSectionProps extends React.HTMLAttributes<HTMLElement> {
  name: FeatureSectionName;
  asChild?: boolean;
}

interface FeatureSectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  isNew?: boolean;
}

const FeatureSection = ({ name, className, asChild = false, ...props }: FeatureSectionProps) => {
  const Comp = asChild ? Slot : 'section';

  return <Comp className={cn(styles[name], className)} {...props} />;
};
FeatureSection.displayName = 'FeatureSection';

const FeatureSectionContent = ({
  className,
  accent,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { accent?: string }) => {
  return (
    <div
      className={cn(
        'grid h-full justify-items-center overflow-hidden rounded-lg lg:grid-cols-2 lg:grid-rows-1',
        styles.bgGradient,
        className,
      )}
      style={accent ? ({ '--fs-accent': accent, ...style } as React.CSSProperties) : style}
      {...props}
    />
  );
};
FeatureSectionContent.displayName = 'FeatureSectionContent';

const FeatureSectionImage = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('relative flex items-center justify-center', className)} {...props} />;
};
FeatureSectionImage.displayName = 'FeatureSectionImage';

const FeatureSectionInformation = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex flex-col justify-center gap-2 tablet:gap-4', className)} {...props} />;
};
FeatureSectionInformation.displayName = 'FeatureSectionInformation';

const FeatureSectionTitle = ({ isNew = false, className, children, ...props }: FeatureSectionTitleProps) => {
  return (
    <>
      {/* "Nuevo producto" es una etiqueta, no un encabezado → <p>, no <h4>. */}
      {isNew && (
        <p className='mb-2 text-sm font-medium uppercase tracking-widest text-light-500 lg:mb-3'>Nuevo producto</p>
      )}

      {/*
        H3: este título vive dentro de la sección "Novedades", que ya aporta el
        H2. Los niveles bajan de uno en uno, sin saltos.
      */}
      <h3
        className={cn('text-[28px] font-medium leading-[1] tablet:text-[36px] lg:text-5xl lg:leading-[1]', className)}
        {...props}
      >
        {children}
      </h3>
    </>
  );
};
FeatureSectionTitle.displayName = 'FeatureSectionTitle';

const FeatureSectionDescription = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('text-sm leading-[1.5] lg:text-[16px] lg:leading-[1.3]', className)} {...props} />
);
FeatureSectionDescription.displayName = 'FeatureSectionDescription';

const FeatureSectionBottom = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex justify-center', className)} {...props} />
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
  type FeatureSectionName,
};
