import clsx from 'clsx';
import styles from './styles.module.scss';

interface FeatureSectionProps extends React.HTMLAttributes<HTMLElement> {
  hasOrder?: boolean;
  name: string;
}

interface FeatureSectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  isNew?: boolean;
}

const FeatureSection = ({ name, className, ...props }: FeatureSectionProps) => {
  return <section className={clsx(styles[name], className)} {...props} />;
};
FeatureSection.displayName = 'FeatureSection';

const FeatureSectionContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={clsx(
        'grid justify-items-center overflow-hidden px-6 py-10 tablet:rounded-lg lg:grid-cols-2 lg:grid-rows-1 lg:px-12 lg:py-5',
        styles.bgGradient,
        className,
      )}
    />
  );
};
FeatureSectionContent.displayName = 'FeatureSectionContent';

const FeatureSectionImage = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={clsx('relative flex items-center justify-center', className)} {...props}>
      {children}
    </div>
  );
};
FeatureSectionImage.displayName = 'FeatureSectionImage';

const FeatureSectionInformation = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx('flex flex-col justify-center gap-3 tablet:gap-4', className)} {...props} />;
};
FeatureSectionInformation.displayName = 'FeatureSectionInformation';

const FeatureSectionTitle = ({ isNew = false, children, ...props }: FeatureSectionTitleProps) => {
  return (
    <div {...props}>
      {isNew && (
        <h4 className='mb-2 text-sm font-medium uppercase tracking-widest text-light-300 lg:mb-3'>Nuevo producto</h4>
      )}
      <h2 className='text-[28px] font-medium uppercase leading-[1.1] tablet:text-4xl lg:text-[54px] lg:leading-[1]'>
        {children}
      </h2>
    </div>
  );
};
FeatureSectionTitle.displayName = 'FeatureSectionTitle';

const FeatureSectionDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={clsx('text-sm leading-[1.5] lg:text-[16px] lg:leading-[1.3]', className)} {...props} />
);
FeatureSectionDescription.displayName = 'FeatureSectionDescription';

const FeatureSectionBottom = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('', className)} {...props}>
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
