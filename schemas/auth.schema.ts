import { useTranslations } from "next-intl";
import * as z from "zod";

// Settings Schema
export const createSettingsSchema = (t: ReturnType<typeof useTranslations>) =>
  z
    .object({
      isTwoFactorEnabled: z.optional(z.boolean()),
      email: z.optional(
        z
          .string()
          .min(1, { message: t("emailRequired") })
          .email({ message: t("emailInvalid") })
      ),
      password: z.optional(
        z.string().min(6, { message: t("passwordMinLength", { min: 6 }) })
      ),
      newPassword: z.optional(
        z.string().min(6, { message: t("passwordMinLength", { min: 6 }) })
      ),
    })
    .refine(
      (data) => {
        if (data.password && !data.newPassword) {
          return false;
        }
        return true;
      },
      {
        message: t("newPasswordRequired"),
        path: ["newPassword"],
      }
    )
    .refine(
      (data) => {
        if (data.newPassword && !data.password) {
          return false;
        }
        return true;
      },
      {
        message: t("passwordRequired"),
        path: ["password"],
      }
    );

export type SettingsBodyType = z.infer<ReturnType<typeof createSettingsSchema>>;

// New Password Schema
export const createNewPasswordSchema = (
  t: ReturnType<typeof useTranslations>
) =>
  z.object({
    password: z.string().min(6, {
      message: t("passwordMinLength", { min: 6 }),
    }),
  });

export type NewPasswordBodyType = z.infer<
  ReturnType<typeof createNewPasswordSchema>
>;

// Forgot Password Schema
export const createForgotPasswordSchema = (
  t: ReturnType<typeof useTranslations>
) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("emailRequired") })
      .email({ message: t("emailInvalid") }),
  });

export type ForgotPasswordBodyType = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;

// Forgot Password Response Schema
export const createForgotPasswordRes = () =>
  z.object({
    status: z.number(),
    message: z.string(),
  });

export type ForgotPasswordResType = z.infer<
  ReturnType<typeof createForgotPasswordRes>
>;

// Reset Schema
export const createResetSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("emailRequired") })
      .email({ message: t("emailInvalid") }),
  });

export type ResetBodyType = z.infer<ReturnType<typeof createResetSchema>>;

// Sign Up Schema
export const createSignUpSchema = (t: ReturnType<typeof useTranslations>) =>
  z
    .object({
      email: z
        .string()
        .min(1, { message: t("emailRequired") })
        .email({ message: t("emailInvalid") })
        .max(255, { message: t("emailMaxLength", { max: 255 }) })
        .trim()
        .regex(/^\S+$/, { message: t("emailNoWhitespace") }),

      display_name: z
        .string()
        .nonempty({ message: t("displayNameRequired") })
        .min(8, { message: t("displayNameMinLength", { min: 8 }) })
        .max(50, { message: t("displayNameMaxLength", { max: 50 }) })
        .regex(/^[A-Za-zÀ-ỹ\s]+$/, {
          message: t("displayNameInvalid"),
        })
        .regex(/^(?!.*\s{2}).*$/, {
          message: t("displayNameNoConsecutiveSpaces"),
        })
        .trim(),
      phone_number: z
        .string()
        .nonempty({ message: t("phoneRequired") })
        .regex(/^\+?[1-9]\d{8,14}$/, {
          message: t("phoneInvalid"),
        })
        .trim()
        .regex(/^\S+$/, { message: t("phoneNoWhitespace") }),

      password: z
        .string()
        .min(8, { message: t("passwordMinLength", { min: 8 }) })
        .max(100, { message: t("passwordMaxLength", { max: 100 }) })
        .regex(/[A-Z]/, { message: t("passwordUppercase") })
        .regex(/[a-z]/, { message: t("passwordLowercase") })
        .regex(/\d/, { message: t("passwordNumber") })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
          message: t("passwordSpecial"),
        })
        .nonempty({ message: t("fieldRequired") })
        .trim()
        .regex(/^\S+$/, { message: t("passwordNoWhitespace") }),

      confirm_password: z
        .string()
        .min(8, { message: t("passwordMinLength", { min: 8 }) })
        .max(100, { message: t("passwordMaxLength", { max: 100 }) })
        .nonempty({ message: t("fieldRequired") })
        .trim()
        .regex(/^\S+$/, { message: t("passwordNoWhitespace") }),
    })
    .strict()
    .superRefine(({ confirm_password, password }, ctx) => {
      if (confirm_password !== password) {
        ctx.addIssue({
          code: "custom",
          message: t("passwordsNotMatch"),
          path: ["confirm_password"],
        });
      }
    });

export type SignUpBodyType = z.infer<ReturnType<typeof createSignUpSchema>>;

export const ChangePasswordSchema = (t: ReturnType<typeof useTranslations>) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(8, { message: t("passwordMinLength", { min: 6 }) })
        .regex(/[A-Z]/, {
          message: t("passwordUppercase"),
        })
        .regex(/[a-z]/, {
          message: t("passwordLowercase"),
        })
        .regex(/\d/, { message: t("passwordNumber") })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
          message: t("passwordSpecial"),
        })
        .nonempty({ message: t("fieldRequired") }),
      newPassword: z
        .string()
        .min(6, { message: t("passwordMinLength", { min: 6 }) })
        .max(100, { message: t("passwordMaxLength", { max: 100 }) })
        .nonempty({ message: t("fieldRequired") }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("passwordsNotMatch"),
    });

export type ChangePasswordFormType = z.infer<
  ReturnType<typeof ChangePasswordSchema>
>;

export const SignUpRes = z.object({
  id: z.string(),
  email: z.string(),
  display_name: z.string(),
  role: z.string(),
  avatar_url: z.string(),
  is_verified: z.boolean(),
  is_active: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date(),
});

export type SignUpResType = z.infer<typeof SignUpRes>;

// Verify Email Schema
export const createVerifyEmailSchema = (
  t: ReturnType<typeof useTranslations>
) =>
  z.object({
    email: z.string().min(1, { message: t("emailRequired") }),
    verification_code: z
      .string()
      .min(1, { message: t("verificationCodeRequired") }),
  });

export type VerifyEmailBodyType = z.infer<
  ReturnType<typeof createVerifyEmailSchema>
>;

// Sign In Schema
export const createSignInSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("emailRequired") })
      .email({ message: t("emailInvalid") }),
    password: z.string().min(3, {
      message: t("passwordMinLength", { min: 3 }),
    }),
  });

export type SignInBodyType = z.infer<ReturnType<typeof createSignInSchema>>;

export const SignInRes = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  is_organization: z.boolean(),
  is_store: z.boolean(),
  is_ai_agent: z.boolean(),
  is_admin: z.boolean(),
  expiresAt: z.string(),
});

export type SignInResType = z.infer<typeof SignInRes>;

// Verify Account Schema
export const createVerifyAccountSchema = () =>
  z
    .object({
      message: z.string(),
    })
    .strict();

export type VerifyAccountResType = z.infer<
  ReturnType<typeof createVerifyAccountSchema>
>;

// Slide Session Body Schema
export const createSlideSessionBody = () => z.object({}).strict();

export type SlideSessionBodyType = z.infer<
  ReturnType<typeof createSlideSessionBody>
>;

export const SlideSessionRes = SignInRes;

export type SlideSessionResType = z.infer<typeof SlideSessionRes>;
