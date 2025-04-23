import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface ContactPageProps {
  params: { locale: string };
}

export default async function ContactPage({
  params: { locale },
}: ContactPageProps) {
  const dictionary = await getDictionary(locale as Locale);

  return (
    <div className='container mx-auto px-4 py-16 max-w-4xl'>
      <h1 className='text-4xl font-bold mb-8 text-gray-900 dark:text-white'>
        {dictionary.navigation.contact}
      </h1>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
        <p className='text-gray-600 dark:text-gray-400 mb-8'>
          Contact form will go here.
        </p>
      </div>
    </div>
  );
}
