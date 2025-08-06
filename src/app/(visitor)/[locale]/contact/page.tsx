"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { sendContactEmail } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, PaperPlaneTilt } from "@phosphor-icons/react";

interface ContactPageProps {
  params: { locale: string };
}

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage({ params: { locale } }: ContactPageProps) {
  const [dictionary, setDictionary] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Load dictionary
  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(locale as Locale);
      setDictionary(dict);
    };
    loadDictionary();
  }, [locale]);

  // Create validation schema with dictionary
  const contactFormSchema = z.object({
    name: z
      .string()
      .min(
        1,
        dictionary?.contact?.form?.validation_name_required ||
          "Name is required"
      )
      .min(
        2,
        dictionary?.contact?.form?.validation_name_min ||
          "Name must be at least 2 characters"
      ),
    email: z
      .string()
      .email(
        dictionary?.contact?.form?.validation_email_invalid ||
          "Please enter a valid email address"
      ),
    subject: z
      .string()
      .min(
        1,
        dictionary?.contact?.form?.validation_subject_required ||
          "Subject is required"
      )
      .min(
        3,
        dictionary?.contact?.form?.validation_subject_min ||
          "Subject must be at least 3 characters"
      ),
    message: z
      .string()
      .min(
        1,
        dictionary?.contact?.form?.validation_message_required ||
          "Message is required"
      )
      .min(
        10,
        dictionary?.contact?.form?.validation_message_min ||
          "Message must be at least 10 characters"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const result = await sendContactEmail(data);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            dictionary?.contact?.form?.success_description ||
            "Message sent successfully!",
        });
        reset(); // Clear the form
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.error ||
            dictionary?.contact?.form?.error_description ||
            "Failed to send message",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          dictionary?.contact?.form?.error_description ||
          "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while dictionary loads
  if (!dictionary) {
    return (
      <div className='container mx-auto px-4 py-16 max-w-4xl'>
        <div className='animate-pulse'>
          <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-64'></div>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-3/4'></div>
            <div className='space-y-6'>
              <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded'></div>
              <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded'></div>
              <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded'></div>
              <div className='h-32 bg-gray-200 dark:bg-gray-700 rounded'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-16 max-w-4xl'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4 text-gray-900 dark:text-white'>
          {dictionary.contact.title}
          <span className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 dark:bg-blue-400 rounded-full'></span>
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
          {dictionary.contact.description}
        </p>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/20 p-8 transition-colors duration-300'>
        {/* Success/Error Messages */}
        {submitStatus.type === "success" && (
          <div className='mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start space-x-3'>
            <CheckCircle
              className='text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0'
              size={20}
            />
            <div>
              <h4 className='text-green-800 dark:text-green-300 font-medium'>
                {dictionary.contact.form.success_title}
              </h4>
              <p className='text-green-700 dark:text-green-400 text-sm mt-1'>
                {submitStatus.message}
              </p>
            </div>
          </div>
        )}

        {submitStatus.type === "error" && (
          <div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3'>
            <XCircle
              className='text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0'
              size={20}
            />
            <div>
              <h4 className='text-red-800 dark:text-red-300 font-medium'>
                {dictionary.contact.form.error_title}
              </h4>
              <p className='text-red-700 dark:text-red-400 text-sm mt-1'>
                {submitStatus.message}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Name Field */}
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-gray-700 dark:text-gray-300'>
              {dictionary.contact.form.name_label}
            </Label>
            <Input
              id='name'
              type='text'
              placeholder={dictionary.contact.form.name_placeholder}
              {...register("name")}
              className={
                errors.name ? "border-red-500 focus:border-red-500" : ""
              }
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-gray-700 dark:text-gray-300'>
              {dictionary.contact.form.email_label}
            </Label>
            <Input
              id='email'
              type='email'
              placeholder={dictionary.contact.form.email_placeholder}
              {...register("email")}
              className={
                errors.email ? "border-red-500 focus:border-red-500" : ""
              }
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
          </div>

          {/* Subject Field */}
          <div className='space-y-2'>
            <Label
              htmlFor='subject'
              className='text-gray-700 dark:text-gray-300'
            >
              {dictionary.contact.form.subject_label}
            </Label>
            <Input
              id='subject'
              type='text'
              placeholder={dictionary.contact.form.subject_placeholder}
              {...register("subject")}
              className={
                errors.subject ? "border-red-500 focus:border-red-500" : ""
              }
            />
            {errors.subject && (
              <p className='text-red-500 text-sm'>{errors.subject.message}</p>
            )}
          </div>

          {/* Message Field */}
          <div className='space-y-2'>
            <Label
              htmlFor='message'
              className='text-gray-700 dark:text-gray-300'
            >
              {dictionary.contact.form.message_label}
            </Label>
            <Textarea
              id='message'
              rows={6}
              placeholder={dictionary.contact.form.message_placeholder}
              {...register("message")}
              className={
                errors.message ? "border-red-500 focus:border-red-500" : ""
              }
            />
            {errors.message && (
              <p className='text-red-500 text-sm'>{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2'
          >
            {isSubmitting ? (
              <>
                <div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent'></div>
                <span>{dictionary.contact.form.sending}</span>
              </>
            ) : (
              <>
                <PaperPlaneTilt size={18} />
                <span>{dictionary.contact.form.submit_button}</span>
              </>
            )}
          </Button>
        </form>

        {/* Contact Information */}
        <div className='mt-8 pt-8 border-t border-gray-200 dark:border-gray-700'>
          <div className='text-center'>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>
              {dictionary.contact.direct_contact}{" "}
              <a
                href='mailto:mateogheeraert04@gmail.com'
                className='text-blue-600 dark:text-blue-400 hover:underline'
              >
                mateogheeraert04@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
