import { useGetCoinsQuery } from '@store/api';

const useHome = () => {
  const faqData = [
    {
      number: '1',
      title: 'Text',
      text: 'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.'
    },
    {
      number: '2',
      title: 'Text',
      text: 'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.'
    },
    {
      number: '3',
      title: 'Text',
      text: 'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.'
    },
    {
      number: '4',
      title: 'Text',
      text: 'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.'
    },
    {
      number: '5',
      title: 'Text',
      text: 'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.'
    },
    {
      number: '6',
      title: 'Text',
      text: 'During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.'
    }
  ];

  const { data, isError, isLoading } = useGetCoinsQuery({ vs_currency: 'usd' });

  return {
    faqData,
    isError,
    isLoading,
    data
  };
};

export { useHome };
