import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
  } from "./emailTemplates.js";
  import sendEmail from "./emailService.js";
  
  export const sendVerificationEmail = async (email, verificationToken) => {
	const subject = "Verify your email";
	const html = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken);
  
	try {
	  const response = await sendEmail(email, subject, null, html);
	  console.log("Email sent successfully", response);
	} catch (error) {
	  console.error("Error sending verification email:", error);
	  throw new Error(`Error sending verification email: ${error}`);
	}
  };
  
  export const sendWelcomeEmail = async (email, firstname) => {
	const subject = "Welcome to Tab OS";
	const html = `
	  <p>Hello ${firstname},</p>
	  <p>Welcome to Tab OS! We're excited to have you on board.</p>
	  <p>Best regards,<br>Tab OS</p>
	`;
  
	try {
	  const response = await sendEmail(email, subject, null, html);
	  console.log("Welcome email sent successfully", response);
	} catch (error) {
	  console.error("Error sending welcome email:", error);
	  throw new Error(`Error sending welcome email: ${error}`);
	}
  };
  
  export const sendPasswordResetEmail = async (email, resetURL) => {
	const subject = "Reset your password";
	const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);
  
	try {
	  const response = await sendEmail(email, subject, null, html);
	  console.log("Password reset email sent successfully", response);
	} catch (error) {
	  console.error("Error sending password reset email:", error);
	  throw new Error(`Error sending password reset email: ${error}`);
	}
  };
  
  export const sendResetSuccessEmail = async (email) => {
	const subject = "Password Reset Successful";
	const html = PASSWORD_RESET_SUCCESS_TEMPLATE;
  
	try {
	  const response = await sendEmail(email, subject, null, html);
	  console.log("Password reset success email sent successfully", response);
	} catch (error) {
	  console.error("Error sending password reset success email:", error);
	  throw new Error(`Error sending password reset success email: ${error}`);
	}
  };
  