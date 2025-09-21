"use client";

import { Form } from "@/shared/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z, ZodType } from "zod";

interface CommonFromProps<T extends ZodType> {
  schema: T;
  data?: Partial<z.infer<T>>;
  defaultValues: z.infer<T>;
  onSubmit: (data: z.infer<T>) => Promise<void>;
  children: (
    form: UseFormReturn<z.infer<T>> & {
      error: string | null;
      isSubmitting: boolean;
    }
  ) => React.ReactNode;
}

function CommonFrom<T extends ZodType>({
  schema,
  defaultValues,
  onSubmit,
  children,
  data,
}: CommonFromProps<T>) {
  type FormValues = z.infer<T>;
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues, ...data },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(data);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Произошла ошибка";
      setError(errorMessage);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (form.formState.errors) {
      console.log("Ошибка");
      console.log(form.formState.errors);
    }
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {children({ ...form, error, isSubmitting })}
      </form>
    </Form>
  );
}

export { CommonFrom, type CommonFromProps };
