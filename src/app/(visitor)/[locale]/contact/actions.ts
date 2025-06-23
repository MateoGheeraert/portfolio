"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(
  formData: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { name, email, subject, message } = formData;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please provide a valid email address",
      };
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Default Resend domain
      to: ["mateogheeraert04@gmail.com"],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1f2937; margin-bottom: 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 8px; font-size: 16px;">Contact Details:</h3>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0; color: #6b7280;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #374151; margin-bottom: 8px; font-size: 16px;">Message:</h3>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 14px; text-align: center;">
                This message was sent from your portfolio contact form.
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        error: "Failed to send email. Please try again.",
      };
    }

    console.log("Email sent successfully:", data);
    return { success: true };
  } catch (error) {
    console.error("Error in sendContactEmail:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
